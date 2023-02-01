interface GetInfoWidowContent {
  title: string;
  contents: string[];
}

function getInfoWidowContent({ title, contents }: GetInfoWidowContent) {
  return [
    '<div style="padding:10px;line-height:150%;">',
    `<h4 style="margin:0 0 16px;">${title}</h4>`,
    contents.join('<br />'),
  ].join('\n'); // join('\n')을 해주지 않으면 작은 따옴표가 위 아래로 생긴다.
}

export default getInfoWidowContent;
