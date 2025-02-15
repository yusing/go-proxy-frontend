"use client";

import { useConfigFileContext } from "@/hooks/config_file";
import { useSetting } from "@/hooks/settings";
import { Alert, ClientOnly, Stack } from "@chakra-ui/react";
import React from "react";
import * as YAML from "yaml";
import { CloseButton } from "../ui/close-button";
import { ConfigUIEditor } from "./ui/config_file";
import { MiddlewareComposeEditor } from "./ui/middlewares";
import { RoutesEditor } from "./ui/routes";

function tryParseYAML(str?: string) {
  if (!str) return {};
  try {
    return YAML.parse(str);
  } catch (e) {
    return {};
  }
}

const UIEditorAlert: React.FC = () => {
  const alertHidden = useSetting("uiEditorAlertHidden", false);
  return (
    <Alert.Root status="info" hidden={alertHidden.val}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Warning</Alert.Title>
        <Alert.Description>
          Changes on UI editor will remove all the #comments in YAML.
        </Alert.Description>
      </Alert.Content>
      <CloseButton
        pos="relative"
        top="-2"
        insetEnd="-2"
        onClick={() => alertHidden.set(true)}
      />
    </Alert.Root>
  );
};

const UIEditor: React.FC = () => {
  const { content, setContent, current } = useConfigFileContext();
  const data = tryParseYAML(content);
  let Editor: React.FC<{ data: any; onChange: (v: any) => void }>;

  if (current.type == "config") {
    Editor = ConfigUIEditor;
  } else if (current.type == "provider") {
    Editor = RoutesEditor;
  } else {
    Editor = MiddlewareComposeEditor;
  }

  return (
    <Stack gap="4">
      <ClientOnly>
        <UIEditorAlert />
      </ClientOnly>
      <Editor data={data} onChange={(v) => setContent(YAML.stringify(v))} />
    </Stack>
  );
};

export default UIEditor;
