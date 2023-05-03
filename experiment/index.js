const m3u8Url = "https://vodedge020.dmc.nico/hlsvod/ht2_nicovideo/nicovideo-sm42165942_43d7dcd6f57a7377fb71085720dc967b86a1e587c6b487280530b46bc7e67f4e/1/ts/playlist.m3u8?ht2_nicovideo=6-78nNBqhsMT_1683132132939.oyetbtd36q_ru3d2e_3ulf4mk55duit";
const baseUrl = "https://vodedge020.dmc.nico/hlsvod/ht2_nicovideo/nicovideo-sm42165942_43d7dcd6f57a7377fb71085720dc967b86a1e587c6b487280530b46bc7e67f4e/1/ts";
let segments = [];
let index = 0;

function downloadSegment() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", segments[index]);
  xhr.responseType = "arraybuffer";

  xhr.onload = function () {
    const arrayBuffer = xhr.response;
    console.log("xhr arrayBuffer response", arrayBuffer);
    segments[index] = arrayBuffer;

    if (index === segments.length - 1) {
      const blob = new Blob(segments, { type: "video/mp4" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "video.mp4";
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      index++;
      downloadSegment();
    }
  };

  xhr.send();
}

function parseM3U8(m3u8Text) {
  const lines = m3u8Text.trim().split("\n");
  console.log("m3u8 parser lines", lines);

  lines.forEach((line) => {
    console.log(line);
  });
  const segments = lines.filter((line) => /\.ts/.test(line)).map((line) => `${baseUrl}/${line}`);
  return segments;
}

function downloadVideo() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", m3u8Url);

  xhr.onload = function () {
    console.log("xhr response", xhr);
    segments = parseM3U8(xhr.responseText);
    console.log("xhr m3u8 parsed segments", segments[0], segments.length)
    downloadSegment();
  };

  xhr.send();
}

downloadVideo();
