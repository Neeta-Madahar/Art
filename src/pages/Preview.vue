<template>
  <p>
    Loading preview...
  </p>
</template>

<script>
  import Prismic from 'prismic-javascript';
  import Cookies from 'js-cookie';
  import qs from 'qs';
  import { API_ENDPOINT } from '@/config/constants';

  const PREVIEW_EXPIRES = 1/48; // 30 minutes
  const linkResolver = doc => doc.type === 'page' ? doc.uid : '/';

  export default {
    name: 'preview',
    beforeCreate () {
      const params = qs.parse(window.location.search.slice(1));

      Prismic.api(API_ENDPOINT)
        .then(api => api.previewSession(params.token, linkResolver, '/'))
        .then((url) => {
          Cookies.set(Prismic.previewCookie, params.token, { expires: PREVIEW_EXPIRES });
          window.location.replace(url);
        })
    }
  }
</script>
