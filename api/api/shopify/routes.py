import os
from ShopifyAPI import shopify


load_dotenv()
shopify_api_key = os.environ.get('SHOPIFY_API_KEY')
shopify_shared_secret = os.environ.get('SHOPIFY_SHARED_SECRET')


shop_url = "https://%s:%s@SHOP_NAME.myshopify.com/admin" % (shopify_api_key, shopify_shared_secret)
shopify.ShopifyResource.set_site(shop_url)