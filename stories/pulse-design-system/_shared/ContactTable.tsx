import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { docTokens as t } from "./docTokens";
import { usePulseDocLayout } from "./usePulseDocLayout";

export type ContactRow = {
  name: string;
  emails: string[];
  slack: string;
};

export const ContactTable: FC<{ rows: ContactRow[] }> = ({ rows }) => {
  const { isMobile } = usePulseDocLayout();

  if (isMobile) {
    return (
      <View style={styles.table} accessibilityRole="summary">
        {rows.map((row) => (
          <View key={row.name} style={styles.card}>
            <Text style={styles.cardName}>{row.name}</Text>
            <View style={styles.emailStack}>
              {row.emails.map((email) => (
                <Text key={email} style={styles.email}>
                  {email}
                </Text>
              ))}
            </View>
            <Text style={styles.slack}>{row.slack}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.table} accessibilityRole="summary">
      <View style={[styles.row, styles.head]}>
        <Text style={[styles.cell, styles.headText, styles.colName]}>Name</Text>
        <Text style={[styles.cell, styles.headText, styles.colEmail]}>Email</Text>
        <Text style={[styles.cell, styles.headText, styles.colSlack]}>Slack</Text>
      </View>
      {rows.map((row) => (
        <View key={row.name} style={styles.row}>
          <Text style={[styles.cell, styles.colName]}>{row.name}</Text>
          <View style={[styles.cell, styles.colEmail, styles.emailStack]}>
            {row.emails.map((email) => (
              <Text key={email} style={styles.email}>
                {email}
              </Text>
            ))}
          </View>
          <Text style={[styles.cell, styles.colSlack]}>{row.slack}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: t.borderMuted,
    borderRadius: t.radius,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: t.borderMuted,
    backgroundColor: t.white,
    alignItems: "stretch",
  },
  head: {
    backgroundColor: t.block,
  },
  cell: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 20,
    color: t.black,
  },
  headText: {
    fontWeight: "700",
    color: t.navy,
  },
  colName: { flex: 1, minWidth: 120 },
  colEmail: { flex: 2, minWidth: 200 },
  colSlack: { flex: 1.2, minWidth: 140 },
  emailStack: { gap: 8 },
  email: {
    fontSize: 14,
    lineHeight: 20,
    color: t.blue,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: t.borderMuted,
    backgroundColor: t.white,
    gap: 8,
  },
  cardName: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700",
    color: t.navy,
  },
  slack: {
    fontSize: 14,
    lineHeight: 20,
    color: t.black,
  },
});
