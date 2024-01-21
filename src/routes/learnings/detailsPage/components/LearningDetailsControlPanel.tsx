import { Button } from '../../../../components/Button';
import { ControlPanel } from '../../../../components/ControlPanel';
import { LoadingIndicator } from '../../../../components/LoadingIndicator';
import { useLocalization } from '../../../../hooks/useLocalization';

type LearningDetailsControlPanelProps = {
  onReturn(): void;
  onEdit(): void;
  onDelete(): void;
};

export function LearningViewControlPanel(props: LearningDetailsControlPanelProps) {
  const { t } = useLocalization();
  return (
    <ControlPanel alwaysSingleRow>
      <ControlPanel.ControlGroup>
        <Button variant="secondary" onClick={props.onReturn}>
          {t('common.return')}
        </Button>
      </ControlPanel.ControlGroup>
      <ControlPanel.ControlGroup alignItems="right">
        <Button variant="secondary" onClick={props.onEdit}>
          {t('common.edit')}
        </Button>
        <Button variant="danger" onClick={props.onDelete}>
          {t('common.delete')}
        </Button>
      </ControlPanel.ControlGroup>
    </ControlPanel>
  );
}

type LearningEditControlPanelProps = {
  onReturn(): void;
  onCancel(): void;
  isSaving: boolean;
};
export function LearningEditControlPanel(props: LearningEditControlPanelProps) {
  const { t } = useLocalization();
  return (
    <ControlPanel alwaysSingleRow>
      <ControlPanel.ControlGroup>
        <Button variant="secondary" onClick={props.onReturn} disabled={props.isSaving}>
          {t('common.return')}
        </Button>
      </ControlPanel.ControlGroup>
      <ControlPanel.ControlGroup alignItems="right">
        {props.isSaving && <LoadingIndicator />}
        <Button variant="secondary" onClick={props.onCancel} disabled={props.isSaving}>
          {t('common.cancel')}
        </Button>
        <Button variant="primary" type="submit" disabled={props.isSaving}>
          {t('common.save')}
        </Button>
      </ControlPanel.ControlGroup>
    </ControlPanel>
  );
}
