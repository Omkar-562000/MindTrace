import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

import { palette, radii, shadows, spacing } from '@/constants/theme';

const toneMap = {
  blue: { accent: palette.primary, background: palette.primaryMuted },
  green: { accent: palette.secondary, background: palette.secondaryMuted },
  yellow: { accent: palette.warning, background: palette.warningMuted },
  red: { accent: palette.danger, background: palette.dangerMuted },
  purple: { accent: palette.accent, background: palette.accentMuted },
};

const toneIcon: Record<keyof typeof toneMap, keyof typeof Ionicons.glyphMap> = {
  red: 'thermometer-outline',
  green: 'battery-charging-outline',
  blue: 'pulse-outline',
  yellow: 'trending-up-outline',
  purple: 'star-outline',
};

export function MetricTile({
  label,
  value,
  support,
  tone = 'blue',
}: {
  label: string;
  value: string;
  support: string;
  tone?: keyof typeof toneMap;
}) {
  return (
    <Surface
      style={[
        styles.card,
        { backgroundColor: toneMap[tone].background, borderColor: palette.border },
      ]}
    >
      <View style={[styles.accentStrip, { backgroundColor: toneMap[tone].accent }]} />
      <Ionicons
        color={toneMap[tone].accent}
        name={toneIcon[tone]}
        size={16}
        style={styles.cornerIcon}
      />
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: toneMap[tone].accent }]}>{value}</Text>
      <Text style={styles.support}>{support}</Text>
    </Surface>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    minHeight: 130,
    overflow: 'hidden',
    paddingBottom: spacing.md,
    paddingLeft: spacing.lg,
    paddingRight: spacing.md,
    paddingTop: spacing.md,
    ...shadows.card,
  },
  accentStrip: {
    borderRadius: 2,
    bottom: 16,
    left: 0,
    position: 'absolute',
    top: 16,
    width: 4,
  },
  cornerIcon: {
    position: 'absolute',
    right: spacing.md,
    top: spacing.md,
  },
  label: {
    color: palette.slate,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    marginTop: 10,
  },
  support: {
    color: palette.ink,
    lineHeight: 20,
    marginTop: spacing.sm,
  },
});
