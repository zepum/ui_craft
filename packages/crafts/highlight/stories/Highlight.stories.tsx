import type { Meta, StoryObj } from "@storybook/react-vite";
import { Highlight } from "../src/Highlight";
import styles from "./Highlight.stories.module.css";
import { Settings } from "lucide-react";
import { useState } from "react";

const meta = {
	title: "Crafts/Highlight",
	component: Highlight,
} satisfies Meta<typeof Highlight>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => {
		const [isOpen, setIsOpen] = useState(false);
		const [isSettingsOpen, setIsSettingsOpen] = useState(false);
		return (
			<div style={{ display: "flex", gap: 10, flexDirection: "column" }}>
				<main className={styles.canvas}>
					<header className={styles.toolbar}>
						<Highlight isOpen={isOpen} isSettingsOpen={isSettingsOpen} />
						<span className={styles.productName}>Canvas</span>
						<button
							type="button"
							className={styles.cta}
							onClick={() => {
								setIsOpen(!isOpen);
								// setIsSettingsOpen(!isSettingsOpen);
							}}
						>
							<Settings size={16} strokeWidth={2} />
						</button>
					</header>
					<section className={styles.workspace}>
						<p className={styles.eyebrow}>Highlight menu</p>
						<h1 className={styles.title}>작업에 필요한 메뉴를 한곳에서.</h1>
						<p className={styles.description}>
							왼쪽 위 메뉴 버튼을 눌러 팝오버와 편집 환경 설정 2뎁스를
							확인하세요.
						</p>
					</section>
				</main>
				<button className={styles.borderButton}>
					<span>Click me</span>
				</button>
			</div>
		);
	},
};

export const OpenWithEditorSettings: Story = {
	render: () => (
		<main className={styles.canvas}>
			<header className={styles.toolbar}>
				<Highlight isOpen />
				<span className={styles.productName}>Canvas</span>
			</header>
		</main>
	),
};
