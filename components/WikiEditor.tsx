"use client";
import React, { useState, useEffect } from "react";
import MarkdownEditor from "./MarkdownEditor";
import CodeEditor from "./CodeEditor";
import { Button } from "./ui/button";
import Link from "next/link";
import { WikiContent, WikiData } from "@/app/types/Wiki";
import { FormikHelpers } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { useWikiDataStore } from "@/store/wikiData.store";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { GripVertical } from "lucide-react";

interface WikiEditorProps {
  wiki?: WikiData;
  setFieldValue?: FormikHelpers<{
    content: Array<WikiContent>;
  }>["setFieldValue"];
  onPreviewWiki?: () => void;
  isCreatingWiki?: boolean;
}

const WikiEditor: React.FC<WikiEditorProps> = ({
  wiki,
  isCreatingWiki,
  setFieldValue,
  onPreviewWiki,
}) => {
  const [components, setComponents] = useState<Array<WikiContent>>(
    wiki?.content || []
  );

  const { title, setContent, setTitle } = useWikiDataStore();
  const [history, setHistory] = useState<Array<Array<WikiContent>>>([]);

  const { toast } = useToast();

  useEffect(() => {
    if (setFieldValue) {
      setFieldValue("content", components);
    }
  }, [components, setFieldValue]);

  const addToHistory = (newState: Array<WikiContent>) => {
    setHistory([...history, newState]);
  };

  const addMarkdownEditor = () => {
    const newComponents = [...components, { id: uuidv4(), type: "markdown" }];
    addToHistory(components);
    setComponents(newComponents);
    setContent(newComponents);
    toast({
      description: "Markdown Editor Added!",
    });
  };

  const addCodeEditor = () => {
    const newComponents = [...components, { id: uuidv4(), type: "code" }];
    addToHistory(components);
    setComponents(newComponents);
    setContent(newComponents);
    toast({
      description: "Code Editor Added!",
    });
  };

  const handleDeleteComponent = (id: string) => {
    addToHistory(components);
    const newComponents = components.filter((component) => component.id !== id);
    const component: WikiContent | undefined = components.find(
      (component) => component.id === id
    );
    setComponents(newComponents);
    setContent(newComponents);
    toast({
      title: `Successfully deleted ${component?.type} component.`,
      description: `Click 'Undo' to get it back!`,
    });
  };

  // small TODO: set the toast description to the type of component that was removed
  const undoLastChange = () => {
    if (history.length > 0) {
      const previousComponents = history.pop();
      if (previousComponents) {
        setComponents(previousComponents);
        setContent(previousComponents);
        toast({
          description: `Undo Successful!`,
        });
      }
    }
  };

  const handlePreviewState = () => {
    if (onPreviewWiki) {
      onPreviewWiki();
      localStorage.setItem("content", JSON.stringify(components));
    }
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setComponents(items);
    setContent(items);
    addToHistory(components);
  };

  return (
    <div className="py-4">
      <div className="flex gap-4 mb-4">
        <Button type="button" onClick={addMarkdownEditor}>
          Add Markdown Editor
        </Button>
        <Button type="button" onClick={addCodeEditor}>
          Add Code Snippet
        </Button>
        <Button type="button" onClick={undoLastChange}>
          Undo
        </Button>
        <Link
          onClick={handlePreviewState}
          href={"/preview_wiki"}
          target={"_blank"}
        >
          <Button type="button">Preview Wiki</Button>
        </Link>
      </div>
      <Toaster />
      <div className="flex flex-col gap-y-4">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <StrictModeDroppable droppableId={"components"} type="group">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="components w-full p-4 mt-2"
              >
                {components.map((component, index) => {
                  switch (component.type) {
                    case "markdown":
                      return (
                        <Draggable
                          key={component.id}
                          draggableId={component.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="components flex flex-row-reverse gap-x-2 w-full p-4 mt-4 border-2 border-solid border-gray-300 rounded-md"
                            >
                              <div
                                className={"h-fit pl-2"}
                                {...provided.dragHandleProps}
                              >
                                <GripVertical />
                              </div>
                              <MarkdownEditor
                                markdownId={component.id ?? ""}
                                initialMarkdownText={component.data ?? ""}
                                isEditingProp={true}
                                isOnViewWiki={false}
                                onDelete={() => {
                                  handleDeleteComponent(component.id);
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    case "code":
                      return (
                        <Draggable
                          key={component.id}
                          draggableId={component.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="components flex flex-row-reverse gap-x-2 w-full p-4 mt-4 border-2 border-solid border-gray-300 rounded-md"
                            >
                              <div
                                className={"h-fit pl-2"}
                                {...provided.dragHandleProps}
                              >
                                <GripVertical />
                              </div>
                              <CodeEditor
                                key={component.id}
                                codeId={component.id ?? ""}
                                initialCode={
                                  component.data ?? "# Start coding here..."
                                }
                                onDelete={() => {
                                  handleDeleteComponent(component.id);
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      );

                    default:
                      return null;
                  }
                })}
                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default WikiEditor;
