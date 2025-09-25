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
import {
  $createTextNode,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
} from "lexical";
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
  text: {
    bold: "font-bold",
  },
};
function onError(error: unknown) {
  console.error(error);
}

interface BProps {
  name: string;
  functionName: () => void;
}

function Button({ name, functionName }: BProps) {
  return (
    <button
      type="button"
      className="border rounded-lg p-1"
      onClick={functionName}
    >
      <strong>{name}</strong>{" "}
    </button>
  );
}

//this is pretty much the header, i need to set up the whole top bar now
function MyHeadingPlugin() {
  const [editor] = useLexicalComposerContext();

  //onclick event to
  const boldH1Text = () => {
    editor.update(() => {
      const root = $getRoot();
      root.append(
        $createHeadingNode("h1").append(
          $createTextNode("Hello world").setFormat("bold")
        )
      );
    });
  };
  const logSelectedText = () => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const nodes = selection.getNodes();
        const selectedText = selection.getTextContent();
        //prettier-ignore
        const points = selection.getStartEndPoints();
        const positions: number[] = [];

        //prints out start and end
        points?.forEach((obj1) => {
          positions.push(obj1.offset);
        });

        // console.log(positions);

        nodes.forEach((node) => {
          //cursed bitwise operations, time to crack open the C textbook 💀💀
          if ($isTextNode(node)) {
            //prettier-ignore
            const bma = node.splitText(positions[0],positions[1]);
            bma.forEach((tn) => {
              if (tn.__text == selectedText && (tn.getFormat() & 1) == 0) {
                tn.setFormat("bold");
              } else if (tn) {
                if (selectedText.includes(tn.getTextContent())) {
                  tn.setFormat(tn.getFormat() & ~1);
                }
              }
            });
          }
        });
      } else {
        console.log("No text selected");
      }
    });
  };

  //will need to set up button component to handle functions
  return (
    <>
      <Button name="H" functionName={boldH1Text} />
      <Button name="B" functionName={logSelectedText} />
    </>
  );
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
        contentEditable={<ContentEditable className="contentEditable" />}
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
