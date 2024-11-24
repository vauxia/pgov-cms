import { Button } from "@trussworks/react-uswds";

interface ViewGoalSearchFacetProps {
  topic: string;
  notDisabledTopics: Array<string>;
  activeTopics: Array<string>;
  updateTopicFilters: (topic: string) => void;
}

export function ViewGoalSearchFacet({
  topic, notDisabledTopics, updateTopicFilters, activeTopics
}: ViewGoalSearchFacetProps) {

  function disableButton(topic: string) {
    if((notDisabledTopics.length > 0 && !notDisabledTopics.includes(topic))) {
      if(activeTopics.indexOf(topic) > -1) {
        return false
      }
      return true
    }
    return false
  }

  const buttonClasses = activeTopics.indexOf(topic) > -1 ? "padding-05 text-white bg-primary-darker" : "padding-05"

  return (
    <Button
      type="button"
      outline
      className={buttonClasses}
      onClick={() => updateTopicFilters(topic)}
      disabled={disableButton(topic)}
    >
      {topic}
    </Button>
  );
}
