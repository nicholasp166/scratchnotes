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
//import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

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

export default function Editor() {
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
            aria-placeholder={"Enter some text..."}
            placeholder={<div></div>}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState) => {
          editorState.read(() => {
            console.log(editorState._nodeMap.get("2")?.getTextContent());
          });
        }}
      />
    </LexicalComposer>
  );
}
