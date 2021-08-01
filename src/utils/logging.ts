import { Colors } from '@constants';
import Color from 'color';

interface LogMeta {
	backgroundColor?: string;
	borderColorY?: string;
	color?: string;
	level: string;
}

function formatLog(logMeta: LogMeta, message: string) {
	const styles = [];
	if (logMeta.backgroundColor) {
		styles.push(`background-color: ${logMeta.backgroundColor}`);
	}
	if (logMeta.borderColorY) {
		styles.push(`border-top: 2px solid ${logMeta.borderColorY}`);
		styles.push(`border-bottom: 2px solid ${logMeta.borderColorY}`);
	}
	if (logMeta.color) {
		styles.push(`color: ${logMeta.color}`);
	}
	const inlineStyle = styles.join(';');
	return { formatMessage: `%c[${logMeta.level}] ${message}`, style: inlineStyle };
}

export function info(message: string, attachedObject?: Record<string, any>) {
	const color = Colors.Logging.info;
	const backgroundColor = Color(color).alpha(0.2).string();
	const { formatMessage, style } = formatLog({ color, backgroundColor, level: 'info' }, message);
	if (!attachedObject) {
		console.info(formatMessage, style);
	} else {
		console.groupCollapsed(formatMessage, style);
		console.info(attachedObject);
		console.groupEnd();
	}
}

export function warn(message: string, attachedObject?: Record<string, any>) {
	const { formatMessage } = formatLog({ level: 'warning' }, message);
	console.warn(formatMessage);
	if (attachedObject) {
		console.warn(attachedObject);
	}
}

export function debug(message: string, attachedObject?: Record<string, any>) {
	const color = Colors.Logging.debug;
	const backgroundColor = Color(color).alpha(0.2).string();
	const { formatMessage, style } = formatLog({ color, backgroundColor, level: 'debug' }, message);
	if (!attachedObject) {
		console.trace(formatMessage, style);
	} else {
		console.groupCollapsed(formatMessage, style);
		console.trace(attachedObject);
		console.groupEnd();
	}
}

export function error(message: string, attachedObject?: Record<string, any>) {
	const { formatMessage } = formatLog({ level: 'error' }, message);
	console.error(formatMessage);
	if (attachedObject) {
		console.error(attachedObject);
	}
}
