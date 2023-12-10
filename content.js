async function showToast(fg, bg, message) {
  console.log(message);
  const tmpEL = document.createElement("div");
  tmpEL.innerHTML =
    '<div style="position:fixed; top:16px; right:16px; padding:16px; '
    + 'color:' + fg + '; ' + 'background:' + bg + '; '
    + 'border:4px solid ' + fg + '; ' + 'border-radius:8px; '
    + 'opacity:0; transition:opacity 0.3s ease-in-out; z-index:9999;">'
    + message +
    '</div>';
  const toast = tmpEL.firstElementChild;
  document.body.appendChild(toast);
  const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))
  await sleep(0);
  toast.style.opacity = "1";
  await sleep(5000);
  toast.style.opacity = "0";
  await sleep(300);
  document.body.removeChild(toast);
}

async function get_rss_href_in_html(id_href) {
  var rss_href = null;
  try {
    const response = await fetch(id_href);
    const htmlString = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const rssLink = doc.querySelector('link[title="RSS"]');
    if (rssLink) {
      rss_href = rssLink.getAttribute('href');
    }
  } catch (error) {
    ;
  }
  return rss_href;
}

function meta_channelId_href() {
  var rss_href = null;
  const meta = document.querySelector('meta[itemprop="channelId"]');
  if (meta) {
    rss_url = "https://www.youtube.com/feeds/videos.xml?channel_id=" + meta.content;
  }
  return rss_href;
}

function location_id_href() {
  const location_href = location.href;
  if (!location_href.startsWith('https://www.youtube.com/@')) {
    return null;
  }
  const id_href = location_href.split('/').slice(0, 4).join('/');
  return id_href;
}

function a_link_href() {
  const ytd_watch_metadata = document.querySelector('ytd-watch-metadata');
  if (!ytd_watch_metadata) {
    return null;
  }
  const ytd_channel_name = ytd_watch_metadata.querySelector('ytd-channel-name');
  if (!ytd_channel_name) {
    return null;
  }
  const a_link = ytd_channel_name.querySelector('a');
  if (!a_link) {
    return null;
  }
  return a_link.href;
}

function get_any_href() {
  var rss_href;

  rss_href = meta_channelId_href();
  if (rss_href)
    return rss_href;

  rss_href = location_id_href();
  if (rss_href)
    return rss_href;

  rss_href = a_link_href();
  if (rss_href)
    return rss_href;

  return null;
}

async function main() {
  if (!location.href.startsWith('https://www.youtube.com/@')
    && !location.href.startsWith('https://www.youtube.com/watch')) {
    return;
  }
  const any_href = get_any_href();
  if (!any_href) {
    return;
  }
  var rss_href = null;
  if (any_href.startsWith('https://www.youtube.com/@')) {
    rss_href = await get_rss_href_in_html(any_href);
  } else {
    rss_href = any_href;
  }
  if (rss_href) {
    try {
      await navigator.clipboard.writeText(rss_href);
      showToast('red', 'white',
        'RSS用URLをクリップボードにコピーしました。<br>'
        + 'お好みのRSSリーダーに登録して下さい。<br><br>'
        + '( ' + rss_href + ' )');
    } catch (error) {
      showToast('white', 'red',
        '失敗しました。以下の可能性があります。<br>'
        + '- フォーカスがメインコンテンツに当たっていない<br>'
        + '- このサイトのクリップボードコピーアクセスが許可されていない<br><br>'
        + '( chrome://settings/content/clipboard )');
    }
  }
}

main();
