import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import Paragraph from '@editorjs/paragraph'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
// import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import { backendHost } from '../../api-config'

const Hyperlink = require('editorjs-hyperlink'); 

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  // paragraph: Paragraph,
  list: List,
  warning: Warning,
//   code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      endpoints: {
        byFile: `${backendHost}/article/uploadFile`, // Your backend file uploader endpoint
        byUrl: `${backendHost}/article/fetchUrl`, // Your endpoint that provides uploading by Url
      }
    }
  },
//   raw: Raw,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  hyperlink: {
    class: Hyperlink,
    config: {
      shortcut: 'CMD+L',
      target: '_blank',
      rel: 'nofollow',
      availableTargets: ['_blank', '_self','_window'],
      availableRels: ['author', 'noreferrer'],
      validate: false,
    }
  }
}

