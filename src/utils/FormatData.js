import {
  richText,
  plainText,
  yogaLessons,
  image
} from './cmsHelpers';

export const formatData =
  (data) => data.map((item) => {
    let obj = {slice_type: item.slice_type};

    switch (item.slice_type) {
      case 'title_section':
        obj = {
          ...obj,
          data: {
            title: plainText(item.primary.title_text)
          }
        };
        break;
      case 'about_section':
        obj = {
          ...obj,
          data: {
            title: plainText(item.primary.title),
            text: richText(item.primary.text),
            image: image(item.primary.image)
          }
        };
        break;
      case 'yoga':
        obj = {
          ...obj,
          items: yogaLessons(item.items),
          data: {
            privateText: richText(item.primary.private_text),
            title: plainText(item.primary.title)
          }
        };
        break;
      case 'testimonials':
        obj = {
          ...obj,
          items: item.items.map(testimonial => ({
            text: plainText(testimonial.text),
            name: plainText(testimonial.name)
          })),
          data: {
            title: plainText(item.primary.title),
            image: image(item.primary.image),
          }
        };
        break;
      case 'meditation':
        obj = {
          ...obj,
          data: {
            title: plainText(item.primary.title),
            text: richText(item.primary.text),
            image: image(item.primary.image),
            quote: plainText(item.primary.quote),
            quote_by: plainText(item.primary.quote_by)
          }
        };
        break;
      case 'resource':
        obj = {
          ...obj,
          items: item.items.map(resource => ({
            title: plainText(resource.title),
            url: plainText(resource.url),
            description: plainText(resource.description),
          })),
          data: {
            title: plainText(item.primary.title)
          }
        };
        break;
      case 'articles':
        obj = {
          ...obj,
          data: {
            title: plainText(item.primary.title),
          },
          items: item.items.map(article => ({
            title: plainText(article.title),
            url: plainText(article.url),
            description: plainText(article.description)
          }))
        };
        break;
      case 'videos':
        obj = {
          ...obj,
          data: {
            title: plainText(item.primary.title),
          },
          items: item.items.map(video => ({
            title: plainText(video.title),
            video_url: plainText(video.video_url),
            description: plainText(video.description)
          }))
        };
        break;
      case 'events':
        obj = {
          ...obj,
          data: {
            title: plainText(item.primary.title),
          },
          items: item.items.map(event => ({
            title: plainText(event.title),
            time: plainText(event.time),
            description: richText(event.description),
            image: image(event.image)
          }))
        };
        break;
      case 'movies':
        obj = {
          ...obj,
          data: {
            title: plainText(item.primary.title),
            text: plainText(item.primary.text),
            backgroundImage: image(item.primary.image),
          },
          items: item.items.map(movie => ({
            title: plainText(movie.title),
            url: plainText(movie.url),
            year: plainText(movie.year)
          }))
        };
        break;
      case 'contact':
        obj = {
          ...obj,
          data: {
            title: plainText(item.primary.title),
            text: plainText(item.primary.text),
            buttonText: plainText(item.primary.button_text)
          }
        };
        break;
      default:
        break;
    }
    return obj;
  });
