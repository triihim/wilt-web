import { Button } from '../../../../components/Button';
import { ControlPanel } from '../../../../components/ControlPanel';
import { useLocalization } from '../../../../hooks/useLocalization';

type LearningDetailsControlPanelProps = {
  onReturn(): void;
  onDelete(): void;
};

export function LearningDetailsControlPanel(props: LearningDetailsControlPanelProps) {
  const { t } = useLocalization();
  return (
    <ControlPanel alwaysSingleRow>
      <ControlPanel.ControlGroup>
        <Button variant="secondary" onClick={props.onReturn}>
          {t('common.return')}
        </Button>
      </ControlPanel.ControlGroup>
      <ControlPanel.ControlGroup alignItems="right">
        <Button variant="danger" onClick={props.onDelete}>
          {t('common.delete')}
        </Button>
      </ControlPanel.ControlGroup>
    </ControlPanel>
  );
}
