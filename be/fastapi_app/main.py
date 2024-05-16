import os
import django
from fastapi import FastAPI, HTTPException
from asgiref.sync import sync_to_async

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')


django.setup()


from app.models import Item

app = FastAPI()

@app.get("/test/items/{item_id}")
async def read_item(item_id: int):
    try:
        item = await sync_to_async(Item.objects.get)(id=item_id)
        print(f"Item found: {item}")
        return {"item_id": item.id, "name": item.name}
    except Item.DoesNotExist:
        print("Item not found.")
        raise HTTPException(status_code=404, detail="Item not found")
    except Exception as e:
        print("Error retrieving item:", str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

    # uvicorn fastapi_app.main:app --reload --port 8002