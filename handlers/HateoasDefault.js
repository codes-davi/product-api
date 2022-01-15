const hateoas = {

    home: {
        default: {
            href: 'http://localhost:3000/auth',
            method: 'GET',
            rel: 'get_token',
            body: 'user',
            type: 'json'
        },
    },
    auth:{
        category: {
            href: 'http://localhost:3000/category',
            method: 'GET',
            rel: 'get_all_categories'
        },
        products: {
            href: 'http://localhost:3000/product',
            method: 'GET',
            rel: 'get_all_products'
        }
    },
    category: [{
            href: 'http://localhost:3000/category/id',
            method: 'GET',
            rel: 'get_category_id',
            param: 'id'
        },
        {
            href: 'http://localhost:3000/category/title',
            method: 'GET',
            rel: 'get_category_title',
            param: 'title'
        }, {
            href: 'http://localhost:3000/category',
            method: 'POST',
            rel: 'post_category'
        },
        {
            href: 'http://localhost:3000/category/id',
            method: 'PUT',
            rel: 'update_category',
            param: 'id'
        }, {
            href: 'http://localhost:3000/category/id',
            method: 'DELETE',
            rel: 'delete_category',
            param: 'id'
        }
    ],
    product: [{
            href: 'http://localhost:3000/product/id',
            method: 'GET',
            rel: 'get_product',
            param: 'id'
        }, {
            href: 'http://localhost:3000/product',
            method: 'POST',
            rel: 'post_category'
        },
        {
            href: 'http://localhost:3000/product/id',
            method: 'PUT',
            rel: 'update_product',
            param: 'id'
        }, {
            href: 'http://localhost:3000/product/id',
            method: 'DELETE',
            rel: 'delete_product',
            param: 'id'
        }
    ]
};

module.exports = hateoas;