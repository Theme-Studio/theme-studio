import IconPack from "@components/IconPack";
import { useBiscuitBox } from "@hooks/use-biscuit-box";
import useTreeView from "@hooks/use-tree-view";
import { Variables } from "@lib/types";
import { Children, cloneElement, PropsWithChildren, ReactNode } from "react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { TreeNodeProps } from ".";
import Element from "../Element";

export interface TreeFolderProps extends TreeNodeProps {
  defaultOpen?: boolean;
}

export default function TreeFolder({
  name,
  children,
  level = 0,
  type,
  defaultOpen = false,
  status = "",
  active = false,
}: PropsWithChildren<TreeFolderProps>) {
  const { iconPack } = useTreeView();
  const { isOpen } = useBiscuitBox({
    isOpen: defaultOpen,
  });

  const bindings: Variables[] = [];

  if (status !== "") {
    if (status === "modified") {
      bindings.push("c@gitDecoration.modifiedResourceForeground");
    } else {
      bindings.push("c@gitDecoration.untrackedResourceForeground");
    }
  }
  return (
    <>
      <Element
        className="flex justify-start items-center h-5.5 cursor-pointer pl-3 text-13px"
        bind={["h:bg@list.hoverBackground", "h:c@list.hoverForeground"]}
      >
        <div
          className="flex justify-between items-center w-full"
          style={{
            marginLeft: `${level * 10}px`,
          }}
        >
          <span className="inline-flex items-center justify-start">
            {isOpen ? (
              <VscChevronDown size="16" className="mx-1" />
            ) : (
              <VscChevronRight size="16" className="mx-1" />
            )}
            <Element
              as="span"
              bind={bindings}
              className="inline-flex items-center justify-start"
            >
              {iconPack !== "Seti Icons" && (
                <span className="w-4 h-4 mr-1.5">
                  {isOpen ? (
                    <IconPack
                      from={iconPack || "Material Icons"}
                      type={type}
                      open
                    />
                  ) : (
                    <IconPack from={iconPack || "Material Icons"} type={type} />
                  )}
                </span>
              )}

              {name}
            </Element>
          </span>
          {status === "modified" && (
            <Element
              className="mr-4 h-5.5 opacity-40 flex items-center justify-center w-3"
              bind={bindings}
            >
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                width="8px"
                height="8px"
              >
                <circle cx="50" cy="50" r="50" fill="currentColor" />
              </svg>
            </Element>
          )}
          {status === "untracked" && (
            <Element
              className="mr-4 h-5.5 opacity-40 flex items-center justify-center w-3"
              bind={bindings}
            >
              <svg
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                width="8px"
                height="8px"
              >
                <circle cx="50" cy="50" r="50" fill="currentColor" />
              </svg>
            </Element>
          )}
        </div>
      </Element>
      {isOpen && (
        <div className="flex flex-col h-auto">
          {Children.map(children, (child: any) => {
            return cloneElement(child, {
              level: level + 1,
            });
          })}
        </div>
      )}
    </>
  );
}