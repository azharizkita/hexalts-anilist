## Deployment

https://hexalts-anilist.vercel.app/

## PWA support

this app is PWA supported! you can save it directly into your homescreen/desktop.

## API limitations

- pagination seems to always return maximum number of `5000 / page size` instead of the real maximum page.
- rate limitation applies for 90 requests per minutes. by this case I decided to implement additional condition on server side props for SEO purposes. see my note at [here](https://github.com/azharizkita/hexalts-anilist/blob/76595dbc91202bc65fb6dbb15cddf7582c5b3399/src/pages/anime/%5Banime_id%5D.tsx#L209)