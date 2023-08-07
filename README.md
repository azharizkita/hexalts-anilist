## Deployment

https://hexalts-anilist.vercel.app/

## PWA support

this app is PWA supported! you can save it directly into your homescreen/desktop.

## uses Web Share API

in anime detail page, I used [Web Share API](https://web.dev/web-share/) in the share button. as a fallback on unsupported browser or environments, the url will be copied instead. check out [this code](https://github.com/azharizkita/hexalts-anilist/blob/705477083f8731e6ae016cbbc5def0ff27800423/src/components/ShareButton/index.tsx#L40)

## API limitations

- pagination seems to always return maximum number of `5000 / page size` instead of the real maximum page.
- rate limitation applies for 90 requests per minutes. by this case I decided to implement additional condition on server side props for SEO purposes. see my note at [here](https://github.com/azharizkita/hexalts-anilist/blob/705477083f8731e6ae016cbbc5def0ff27800423/src/pages/anime/%5Banime_id%5D.tsx#L218)