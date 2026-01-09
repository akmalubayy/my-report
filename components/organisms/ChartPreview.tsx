"use client";

import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveFunnel } from "@nivo/funnel";
import { useReportStore } from "@/store/useReportStore";

export default function ChartPreview() {
    const { tasks, chartType, title } = useReportStore();

    if (tasks.length === 0) {
        return (
            <div className="flex bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl items-center justify-center p-12 text-slate-400 h-[400px]">
                <div className="text-center">
                    <p className="text-lg font-medium italic">Menunggu data task...</p>
                    <p className="text-sm">Visualisasi Nivo akan muncul di sini</p>
                </div>
            </div>
        );
    }

    // Common Theme for Nivo
    const theme = {
        fontSize: 12,
        axis: {
            legend: { text: { fontSize: 13, fontWeight: 600 } },
            ticks: { text: { fill: "#64748b" } }
        },
        grid: { line: { stroke: "#f1f5f9", strokeWidth: 1 } },
    };

    return (
        <div id="chart-preview" className="w-full h-[450px] bg-white p-4 rounded-3xl shadow-sm border border-slate-100 relative group transition-all">
            <div className="absolute top-4 left-6 z-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{title}</h3>
            </div>

            {chartType === "bar" && (
                <ResponsiveBar
                    data={tasks.map(t => ({ task: t.name, progress: t.progress }))}
                    keys={["progress"]}
                    indexBy="task"
                    margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: "linear" }}
                    indexScale={{ type: "band", round: true }}
                    colors={{ scheme: "paired" }}
                    borderRadius={8}
                    theme={theme}
                    axisLeft={{ legend: "Progress (%)", legendOffset: -45 }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                    animate={true}
                />
            )}

            {chartType === "pie" && (
                <ResponsivePie
                    data={tasks.map(t => ({ id: t.name, label: t.name, value: t.progress }))}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: "category10" }}
                    borderWidth={1}
                    borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
                    theme={theme}
                />
            )}

            {chartType === "radar" && (
                <ResponsiveRadar
                    data={tasks.map(t => ({ task: t.name, progress: t.progress }))}
                    keys={["progress"]}
                    indexBy="task"
                    maxValue={100}
                    margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                    curve="linearClosed"
                    borderWidth={2}
                    borderColor={{ from: "color" }}
                    gridLevels={5}
                    gridShape="circular"
                    gridLabelOffset={36}
                    enableDots={true}
                    dotSize={10}
                    dotColor={{ from: "color" }}
                    dotBorderWidth={2}
                    dotBorderColor={{ from: "color" }}
                    colors={{ scheme: "spectral" }}
                    fillOpacity={0.25}
                    blendMode="multiply"
                    animate={true}
                    theme={theme}
                />
            )}

            {chartType === "line" && (
                <ResponsiveLine
                    data={[{ id: "Progress", data: tasks.map(t => ({ x: t.name, y: t.progress })) }]}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: "point" }}
                    yScale={{ type: "linear", min: 0, max: 100, stacked: false, reverse: false }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "Task", legendOffset: 36, legendPosition: "middle" }}
                    axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "Progress (%)", legendOffset: -40, legendPosition: "middle" }}
                    pointSize={10}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    theme={theme}
                    colors={{ scheme: "set2" }}
                />
            )}

            {chartType === "funnel" && (
                <ResponsiveFunnel
                    data={tasks.map(t => ({ id: t.id, value: t.progress, label: t.name }))}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    valueFormat=">-.0s"
                    colors={{ scheme: "spectral" }}
                    borderWidth={20}
                    labelColor={{ from: "color", modifiers: [["darker", 3]] }}
                    beforeSeparatorLength={100}
                    beforeSeparatorOffset={20}
                    afterSeparatorLength={100}
                    afterSeparatorOffset={20}
                    currentPartSizeExtension={10}
                    currentBorderWidth={40}
                    motionConfig="slow"
                    theme={theme}
                />
            )}
        </div>
    );
}
