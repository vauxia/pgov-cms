export interface NodeGoalProps {
  title: string;
  id: string;
  body: {
    value: string;
  };
  path: string;
  topics: [
    {
      id: string;
      name: string;
    },
  ];
  plan: any;
  goalType: any;
  period: any;
}

export interface NodePlanProps {
  title: string;
  id: string;
  body: {
    value: string;
  };
  agency: any;
  path: string;
  period: any;
}

export interface ViewFilter {
  options: Object;
  value: any;
}
