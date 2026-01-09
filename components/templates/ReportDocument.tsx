"use client";

import { Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { Task } from "../../store/useReportStore";

// Professional Styles
const styles = StyleSheet.create({
    page: {
        padding: 50,
        backgroundColor: "#FFFFFF",
        fontFamily: "Helvetica",
        color: "#1e293b",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: "#e2e8f0",
        paddingBottom: 20,
    },
    logoContainer: {
        padding: 10,
        backgroundColor: "#3b82f6",
        borderRadius: 8,
    },
    headerText: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    reportTitle: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#0f172a",
        marginBottom: 5,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    reportSubtitle: {
        fontSize: 10,
        color: "#64748b",
        letterSpacing: 2,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
    },
    sectionIndicator: {
        width: 4,
        height: 18,
        backgroundColor: "#3b82f6",
        marginRight: 10,
        borderRadius: 2,
    },
    sectionTitleText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#334155",
        textTransform: "uppercase",
    },
    chartWrapper: {
        width: "100%",
        height: 320,
        backgroundColor: "#fcfdfe",
        borderWidth: 1,
        borderColor: "#f1f5f9",
        borderRadius: 12,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    chartImage: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    },
    taskGrid: {
        flexDirection: "column",
    },
    taskCard: {
        marginBottom: 12,
        padding: 15,
        backgroundColor: "#f8fafc",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#f1f5f9",
    },
    taskTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
    },
    taskName: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#1e293b",
    },
    taskPercentage: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#2563eb",
    },
    progressContainer: {
        width: "100%",
        height: 5,
        backgroundColor: "#e2e8f0",
        borderRadius: 3,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#3b82f6",
    },
    taskNote: {
        marginTop: 8,
        fontSize: 9,
        lineHeight: 1.4,
        color: "#64748b",
        fontStyle: "italic",
        paddingLeft: 8,
        borderLeftWidth: 2,
        borderLeftColor: "#cbd5e1",
    },
    footer: {
        position: "absolute",
        bottom: 30,
        left: 50,
        right: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
    },
    footerText: {
        fontSize: 8,
        color: "#94a3b8",
    },
});

interface ReportPDFProps {
    title: string;
    tasks: Task[];
    chartImage?: string;
}

export const ReportDocument = ({ title, tasks, chartImage }: ReportPDFProps) => {
    const currentDate = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Document title={title} author="Work Report Generator">
            <Page size="A4" style={styles.page}>
                {/* Header Block */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.reportTitle}>{title}</Text>
                        <Text style={styles.reportSubtitle}>LAPORAN ANALISIS PEKERJAAN</Text>
                    </View>
                    <View style={styles.headerText}>
                        <Text style={{ fontSize: 9, color: "#94a3b8", marginBottom: 2 }}>TANGGAL PENERBITAN</Text>
                        <Text style={{ fontSize: 11, fontWeight: "bold" }}>{currentDate}</Text>
                    </View>
                </View>

                {/* Visualization Section */}
                {chartImage && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionIndicator} />
                            <Text style={styles.sectionTitleText}>Visualisasi Data</Text>
                        </View>
                        <View style={styles.chartWrapper}>
                            <Image src={chartImage} style={styles.chartImage} />
                        </View>
                    </View>
                )}

                {/* Task Details Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <View style={[styles.sectionIndicator, { backgroundColor: "#10b981" }]} />
                        <Text style={styles.sectionTitleText}>Ringkasan Tugas & Progress</Text>
                    </View>

                    <View style={styles.taskGrid}>
                        {tasks.map((task) => (
                            <View key={task.id} style={styles.taskCard} wrap={false}>
                                <View style={styles.taskTop}>
                                    <Text style={styles.taskName}>{task.name}</Text>
                                    <Text style={styles.taskPercentage}>{task.progress}% SELESAI</Text>
                                </View>
                                <View style={styles.progressContainer}>
                                    <View style={[styles.progressBar, { width: `${task.progress}%` }]} />
                                </View>
                                {task.note && (
                                    <Text style={styles.taskNote}>{task.note}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* Global Footer */}
                <View style={styles.footer} fixed>
                    <Text style={styles.footerText}>© {new Date().getFullYear()} Work Report Generator. All rights reserved.</Text>
                    <Text
                        style={styles.footerText}
                        render={({ pageNumber, totalPages }) => `Halaman ${pageNumber} dari ${totalPages}`}
                    />
                </View>
            </Page>
        </Document>
    );
};
