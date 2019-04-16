import PrismicDom from 'prismic-dom';

const linkResolver = (doc) => {
  return doc;
}

const htmlSerializer = (type, element, content) => {
  const hostName = RegExp(window.location.hostname);
  switch (type) {
    case 'hyperlink':
      if (element.data.link_type === 'Web' && /#/.test(element.data.url) && hostName.test(element.data.url)) {
        return `<a href="#${element.data.url.split('#')[1]}">${content}</a>`;
      }
      break;
    default:
      return null;
  }
}

export const richText = (text) => PrismicDom.RichText.asHtml(text, linkResolver, htmlSerializer);
export const plainText = (text = '') => text.length ? PrismicDom.RichText.asText(text) : null;
export const image = (image) => {
  return {
    url: image.url,
    alt: image.alt
  }
};

const linkObj = (link = {}) => {
  if (!link.url && !link.slug) return null;

  if (link.link_type === 'Web') {
    const TARGET_BLANK = link.target ? {
      target: link.target,
      rel: 'noopener noreferrer',
    } : {};

    return {
      ...TARGET_BLANK,
      url: link.url,
    };
  }

  return {
    url: `/${link.slug}`
  }
};

const formatYogaData = (obj) => {
  let returnObj = [];

  Object.keys(obj).forEach((day) => {
    let dayObject = { day, lessons: [] };

    obj[day].forEach((lessonObj) => {
      const {
        lesson,
        time,
        location,
        location_link
      } = lessonObj;

      dayObject.lessons.push({
        lesson,
        time,
        location,
        location_link
      });
    });

    returnObj.push(dayObject);
  });

  return returnObj;
};

export const yogaLessons = (lessons) => {
  let daysObject = {};

  for(let i = 0; i < lessons.length; i++) {
    if(!daysObject[lessons[i].day.toLowerCase()]) {
      daysObject[lessons[i].day.toLowerCase()] = [];
    }

    daysObject[lessons[i].day.toLowerCase()].push({
      lesson: plainText(lessons[i].lesson),
      time: plainText(lessons[i].time),
      location: plainText(lessons[i].location),
      location_link: linkObj(lessons[i].location_link)
    });
  }

  return formatYogaData(daysObject);
};
