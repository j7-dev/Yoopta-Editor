import { YooEditor, YooptaBlockData, SlateElement, YooptaContentValue } from '@yoopta/editor';

export function getPluginByInlineElement(plugins: YooEditor['plugins'], elementType: string) {
  const plugin = Object.values(plugins).find((plugin) => plugin.type === plugin.elements?.[elementType].rootPlugin);
  return plugin;
}

const MARKS_NODE_NAME_MATCHERS_MAP = {
  underline: { type: 'underline', tag: 'U' },
  strike: { type: 'strike', tag: 'S' },
  code: { type: 'code', tag: 'CODE' },
  italic: { type: 'italic', tag: 'I' },
  bold: { type: 'bold', tag: 'B' },
};

function serializeChildren(children, plugins) {
  return children
    .map((child) => {
      let innerHtml = '';
			let count = 0; // we count here to prevent add styles more than once
			const styleArr = highlightToInlineCssAttribute(child?.highlight);

      if (child.text) {
        innerHtml = Object.keys(MARKS_NODE_NAME_MATCHERS_MAP).reduce((acc, mark) => {

          if (child[mark]) {
						count += 1;
            return `<${MARKS_NODE_NAME_MATCHERS_MAP[mark].tag} ${count === 0 ? styleArr : ''}>${acc}</${MARKS_NODE_NAME_MATCHERS_MAP[mark].tag}>`;
          }else if(child?.highlight && count === 0){
						count += 1;
						return `<span ${styleArr}>${acc}</span>`;
					}
          return acc;
        }, child.text);

        return innerHtml;
      } else if (child.type) {
        const childPlugin = getPluginByInlineElement(plugins, child.type);

        if (childPlugin && childPlugin.parsers?.html?.serialize) {
          innerHtml = childPlugin.parsers.html.serialize(child, serializeChildren(child.children, plugins));
					console.log('innerHtml ', innerHtml);
          return innerHtml;
        }
      }

      return innerHtml;
    })
    .join('');
}

export function serialize(editor: YooEditor, blocksData: YooptaBlockData[]) {
  const blocks = blocksData.sort((a, b) => a.meta.order - b.meta.order);

  const html = blocks.map((blockData) => {
    const plugin = editor.plugins[blockData.type];



    if (plugin && plugin.parsers?.html?.serialize) {
      const content = serializeChildren(blockData.value[0].children, editor.plugins);
      const text = plugin.parsers.html.serialize(blockData.value[0] as SlateElement, content);
      return `${text}\n`;
    }

    return '';
  });

  return `<body id="yoopta-clipboard" data-editor-id="${editor.id}">${html.join('')}</body>`;
}

export function serializeHTML(editor: YooEditor, content: YooptaContentValue) {
  const selectedBlocks = Object.values(content);
  return serialize(editor, selectedBlocks);
}


export function highlightToInlineCssAttribute(highlight: {
	[key:string]: string | number
} | undefined){
	if(highlight){
		let style = 'style="';
		style += Object.keys(highlight).reduce((acc, key) => {
			return `${camelToKebab(key)}: ${highlight[key]};`;
		}, '');
		style += '"';

		return style;
	}
	return '';
}

export function camelToKebab(str:string):string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
