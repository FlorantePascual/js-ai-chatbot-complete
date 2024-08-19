export interface ThreadMessages {
    options: ThreadMessageOptions;
    response: ThreadMessageResponse;
    body: ThreadMessageBody;
    data: MessageObject[];
}
interface ThreadMessageBody {
    object: string;
    data: MessageObject[];
    first_id: string;
    last_id: string;
    has_more: boolean;
}
export interface MessageObject {
    id: string;
    object: string;
    created_at: number;
    assistant_id?: string;
    thread_id: string;
    run_id?: string;
    role: string;
    content: Content[];
    attachments: any[];
    metadata: any;
}
interface Content {
    type: string;
    text: Text;
}
interface Text {
    value: string;
    annotations: Annotation[];
}
interface Annotation {
    type: string;
    text: string;
    start_index: number;
    end_index: number;
    file_citation: FileCitation;
}
interface FileCitation {
    file_id: string;
}
interface ThreadMessageResponse {
    size: number;
    timeout: number;
}
interface ThreadMessageOptions {
    method: string;
    path: string;
    query?: any;
    headers: MessageOptionHeaders;
}
interface MessageOptionHeaders {
    [key: string]: string;
}
export interface MessageDeltaObject {
    id: string;
    object: string;
    delta: MessageDelta;
}
interface MessageDelta {
    content: DeltaContent[];
}
interface DeltaContent {
    index: number;
    type: string;
    text: DeltaText;
}
interface DeltaText {
    value: string;
}
export {};
