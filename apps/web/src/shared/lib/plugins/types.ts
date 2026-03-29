import React from "react";

export interface PluginProps {
  data: any;
  onChange: (newData: any) => void;
  isEditing: boolean;
}

export interface NebulaPlugin {
  type: string;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<PluginProps>;
  initialData: any;
}
