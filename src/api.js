const SERVER = 'http://52.86.154.72/api';
import {Platform} from 'react-native';
import {logout} from './app/reducers/app';
import store from './app/store';
import {showToats} from './utils';

const request = ({url, headers, body = {}, method, token, params = {}}) => {
  const req_headers = {
    clientVersion: Platform.OS,
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };

  if (token) {
    req_headers.Authorization = `Bearer ${token}`;
  }

  let URL = `${SERVER}${url}`;

  const requestOptions = {
    method,
    headers: req_headers,
  };

  if (body && Object.keys(body).length) {
    requestOptions.body = JSON.stringify(body);
  }

  Object.keys(params).forEach(key => {
    if (!params[key] || params[key] === 'false') delete params[key];
  });

  Object.keys(params).map((key, index) => {
    if (index === 0) {
      URL += `?${key}=${params[key]}`;
    } else {
      URL += `&${key}=${params[key]}`;
    }
  });

  return new Promise(async (resolve, reject) => {
    console.log({...requestOptions, url: URL});

    try {
      const json = await fetch(URL, requestOptions);
      const res = await json.json();
      console.log(res);

      if (json.ok) {
        if (res.error) {
          showToats(res.error?.message);
        }
        resolve(res);
      } else {
        resolve(res);
        if (json.status === 401) {
          store.dispatch(logout());
        }
        if (res?.msg || res.error || res.message) {
          showToats(
            res?.msg || res.message || typeof res.error === 'string'
              ? res.error
              : res.error?.message,
          );
        }
      }
    } catch (err) {
      console.log(err);
      resolve(err);
    }
  });
};

export default {
  login: data => {
    return request({url: '/user/login', body: data, method: 'post'});
  },
  register: data => {
    return request({url: '/user/registration', body: data, method: 'post'});
  },
  forgot: data => {
    return request({url: '/user/forgot', body: data, method: 'post'});
  },
  logout: token => {
    return request({url: '/user/logout', method: 'post', token});
  },
  slides: () => {
    return request({url: '/front/sliders', method: 'get'});
  },
  featured_banners: () => {
    return request({url: '/front/featured-banners', method: 'get'});
  },
  featured_links: () => {
    return request({url: '/front/featured-links', method: 'get'});
  },
  services: () => {
    return request({url: '/front/services', method: 'get'});
  },
  partners: () => {
    return request({url: '/front/partners', method: 'get'});
  },
  products: ({params}) => {
    return request({url: '/front/products', method: 'get', params});
  },
  productDetails: id => {
    return request({url: `/front/product/${id}/details`, method: 'get'});
  },
  productReplies: id => {
    return request({url: `/front/product/${id}/replies`, method: 'get'});
  },
  productComments: id => {
    return request({url: `/front/product/${id}/comments`, method: 'get'});
  },
  productRatings: id => {
    return request({url: `/front/product/${id}/ratings`, method: 'get'});
  },
  categories: () => {
    return request({url: '/front/categories', method: 'get'});
  },
  category: id => {
    return request({url: `/front/${id}/category`, method: 'get'});
  },
  sub_categories: id => {
    return request({url: `/front/${id}/subcategories`, method: 'get'});
  },
  child_categories: id => {
    return request({url: `/front/${id}/childcategories`, method: 'get'});
  },
  search: params => {
    return request({url: '/front/search', method: 'get', params});
  },
  dashboard: token => {
    return request({url: '/user/dashboard', method: 'get', token});
  },
  orders: token => {
    return request({url: '/user/orders', method: 'get', token});
  },
  order: ({token, id}) => {
    return request({url: `/user/order/${id}/details`, method: 'get', token});
  },
  wishlists: token => {
    return request({url: '/user/wishlists', method: 'get', token});
  },
  remove_wishlist: ({token, id}) => {
    return request({url: `/user/wishlists/remove/${id}`, method: 'get', token});
  },
  vendor: id => {
    return request({url: `/front/vendor/products/${id}`, method: 'get'});
  },
  transactions: token => {
    return request({url: '/user/transactions', method: 'get', token});
  },
  pages: token => {
    return request({url: '/front/pages', method: 'get', token});
  },
  faq: token => {
    return request({url: '/front/faqs', method: 'get', token});
  },
  blogs: token => {
    return request({url: '/front/blogs', method: 'get', token});
  },
  currencies: () => {
    return request({url: '/front/currencies', method: 'get'});
  },
  default_currency: () => {
    return request({url: '/front/default/currency', method: 'get'});
  },
};
