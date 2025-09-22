//import { EditorState } from "lexical";
//import { useEffect } from "react";
import "../styles/styles.css";

//import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getNodeByKey } from "lexical";

interface textItems {
  textItem: string;
  setTextItem: React.Dispatch<React.SetStateAction<string>>;
}

const theme = {
  // Theme styling goes here
  //...
};
function onError(error: unknown) {
  console.error(error);
}

/*function MyOnChangePlugin(props: {
  //takes in onchange editor
  onChange: (editorState: EditorState) => void;
}): null {
  const [editor] = useLexicalComposerContext(); //essential part for hook
  const { onChange } = props;
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      //registers editor state and returns it
      onChange(editorState);
    });
  }, [onChange, editor]);
  return null;
}*/ //

export default function Editor({ textItem, setTextItem }: textItems) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="contentEditable"
            aria-placeholder={textItem}
            placeholder={<div></div>}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState) => {
          editorState.read(() => {
            const node1 = $getNodeByKey("2");
            if (node1) {
              setTextItem(node1.getTextContent());
            } else {
              setTextItem("");
            }
          });
        }}
      />
    </LexicalComposer>
  );
}
