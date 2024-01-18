import Button from '../../../../components/Button';
import ControlPanel from '../../../../components/ControlPanel';

type LearningDetailsControlPanelProps = {
  onReturn(): void;
  onDelete(): void;
};

export default function LearningDetailsControlPanel(props: LearningDetailsControlPanelProps) {
  return (
    <ControlPanel alwaysSingleRow>
      <ControlPanel.ControlGroup>
        <Button variant="secondary" onClick={props.onReturn}>
          Return
        </Button>
      </ControlPanel.ControlGroup>
      <ControlPanel.ControlGroup alignItems="right">
        <Button variant="danger" onClick={props.onDelete}>
          Delete
        </Button>
      </ControlPanel.ControlGroup>
    </ControlPanel>
  );
}
