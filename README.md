# products_management
### Endpoints : -
#### RootPath : `/api/v1/`
- **/auth**
    - > /sign-up _( method:post )_ 
        - registration
    - > /sign-in _( method:post )_
        - login
- **/products**
    - > /add _( method:post )_
        - create new product
    - > /update/`<productId>` _( method:patch )_
        - update the created product details 
    - > /delete/`<ProductId>` _( method:delete )_
        - delete the create product details
- **/reviews**
  - > /`<productId>` _( method:post )_
    - create a new review about a product
  - > /`<reviewId>` _( method:patch )_
    - update the review
  - > /`<reviewId>` _( method:delete )_
    - delete the review

    <center>
    <p style="color:yellow">.env => SECRET , PORT</p>
    </center>