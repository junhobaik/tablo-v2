/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', () => {
  let loadedTitle;
  let loadedUrl;
  let favIconUrl;
  let siteUrl;
  let feedUrl;
  let isReady = false;

  chrome.tabs.getSelected(null, tab => {
    loadedTitle = tab.title;
    loadedUrl = tab.url;
    favIconUrl = tab.favIconUrl || undefined;
    isReady = true;

    const img = document.querySelector('.favicon>img');

    if (favIconUrl !== undefined) {
      img.src = favIconUrl;
    } else {
      const noFavicon = document.querySelector('.no-favicon');
      img.parentNode.style.display = 'none';
      noFavicon.style.display = 'flex';
      noFavicon.querySelector('span').innerText = loadedTitle[0].toUpperCase();
    }
    document.querySelector('.item-title').value = loadedTitle;

    siteUrl = loadedUrl
      .split('/')
      .splice(0, 3)
      .join('/');

    const urlCheck = ['rss', 'feed.xml', 'feed', 'd2.atom']; // AddFeed.js urlCheck

    const findFeed = (url, checkCount = 0) => {
      const requestUrl = `https://api.rss2json.com/v1/api.json?rss_url=${url}/${urlCheck[checkCount]}`;
      fetch(requestUrl)
        .then(res => {
          if (res.status === 200) return res.json();
          throw Error('Feed not found');
        })
        .then(result => {
          // console.log(result);
          feedUrl = `${url}/${urlCheck[checkCount]}`;
          document.querySelector('.add-feed-button').classList.remove('disable-button');
          document.querySelector('.not-found').style.display = 'none';
          document.querySelector('.found').style.display = 'flex';
          document.querySelector('.found>input').value = result.feed.title;
        })
        .catch(() => {
          if (checkCount < urlCheck.length - 1) {
            setTimeout(() => {
              findFeed(url, checkCount + 1);
            }, 1000);
          } else {
            document.querySelector('.not-found p').innerText = 'Cannot find Feed for the current site';
          }
        });
    };

    const throttleFindFeed = _.throttle(findFeed, 1000);

    chrome.storage.sync.get('tablo_v2_feed', items => {
      let isNeedFind = true;
      for (const f of items.tablo_v2_feed) {
        if (f.link === siteUrl) {
          isNeedFind = false;
          document.querySelector('.not-found p').innerText = 'Feed already added';
          break;
        }
      }
      if (isNeedFind) throttleFindFeed(siteUrl);
    });
  });

  document.querySelector('.add-button').addEventListener('click', () => {
    if (isReady) {
      chrome.storage.sync.get('tablo_v2_tab', items => {
        const { cart } = items.tablo_v2_tab;

        chrome.storage.sync.set(
          {
            tablo_v2_tab: {
              ...items.tablo_v2_tab,
              cart: [
                ...cart,
                {
                  link: loadedUrl,
                  title: document.querySelector('.item-title').value,
                  description: '',
                },
              ],
            },
          },
          () => {
            document.querySelector('.add-button>span').innerText = 'DONE!';
            setTimeout(() => {
              document.querySelector('.add-button>span').innerText = 'Add to Cart';
            }, 1000);
          }
        );
      });
    } else {
      // alert('ERROR');
    }
  });

  document.querySelector('.add-feed-button').addEventListener('click', () => {
    chrome.storage.sync.get('tablo_v2_feed', items => {
      chrome.storage.sync.set(
        {
          tablo_v2_feed: [
            ...items.tablo_v2_feed,
            {
              category: 'Inbox',
              id: `from-popup-${feedUrl}`,
              isHide: false,
              link: siteUrl,
              title: document.querySelector('.feed-title').value,
              url: feedUrl,
            },
          ],
        },
        () => {
          document.querySelector('.found').style.display = 'none';
          document.querySelector('.not-found').style.display = 'flex';
          document.querySelector('.not-found p').innerText = 'Feed already added';
          document.querySelector('.add-feed-button').classList.add('disable-button');
        }
      );
    });
  });
});
