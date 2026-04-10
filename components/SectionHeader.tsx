import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { palette, spacing } from '@/constants/theme';

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleAccent}>
        <Text variant="titleMedium" style={styles.title}>
          {title}
        </Text>
      </View>
      {subtitle ? (
        <Text variant="bodyMedium" style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  titleAccent: {
    borderLeftColor: palette.primary,
    borderLeftWidth: 3,
    paddingLeft: 10,
  },
  title: {
    color: palette.navy,
    fontWeight: '800',
    marginBottom: 4,
  },
  subtitle: {
    color: palette.slate,
    lineHeight: 20,
    marginTop: 4,
  },
});
