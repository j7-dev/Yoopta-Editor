export { YooptaPlugin } from './plugins';
export {
  useBlockData,
  useYooptaBlock,
  useYooptaEditor,
  useYooptaPlugin,
  useBlockSelected,
  useYooptaReadOnly,
  useYooptaPluginOptions,
} from './contexts/YooptaContext/YooptaContext';
import { YooptaEditor } from './YooptaEditor';

// [TODO] - should be in separated package @yoopta/common/ui or @yoopta/ui
export { UI } from './UI';

export { useYooptaTools, Tools } from './contexts/YooptaContext/ToolsContext';

export { generateId } from './utils/generateId';
export { HOTKEYS } from './utils/hotkeys';
export { getRootBlockElementType, getRootBlockElement } from './utils/blockElements';
export { findPluginBlockBySelectionPath } from './utils/findPluginBlockBySelectionPath';
export { findSlateBySelectionPath } from './utils/findSlateBySelectionPath';
export { findPluginBlockByType } from './utils/findPluginBlockByType';

export { createYooptaEditor } from './editor';
export { createYooptaMark, YooptaMarkParams, YooptaMark } from './marks';
export { YooEditor, SlateElement, YooptaBlockData, YooptaBlock, YooptaContentValue } from './editor/types';
export { buildBlockData, buildBlockElement } from './components/Editor/utils';

export default YooptaEditor;
export {
  PluginElementRenderProps,
  PluginEventHandlerOptions,
  PluginCustomEditorRenderProps,
  YooptaMarkProps,
} from './plugins/types';

import './styles.css';
