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
import { $createTextNode, $getNodeByKey, $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode } from "@lexical/rich-text";
import { HeadingNode } from "@lexical/rich-text";

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

//this is pretty much the header, i need to set up the whole top bar now
function MyHeadingPlugin() {
  const [editor] = useLexicalComposerContext();

  //onclick event to
  const onClick = () => {
    editor.update(() => {
      const root = $getRoot();
      root.append(
        $createHeadingNode("h1").append(
          $createTextNode("Hello world").setFormat("bold")
        )
      );
    });
  };

  //will need to set up button component to handle functions
  return <button onClick={onClick}>Heading</button>;
}

export default function Editor({ textItem, setTextItem }: textItems) {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <MyHeadingPlugin />
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
