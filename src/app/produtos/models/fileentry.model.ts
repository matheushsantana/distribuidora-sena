import { AngularFireUploadTask } from "@angular/fire/storage";
import { Observable } from "rxjs";

export interface FileEntry {
    file: File;
    task: AngularFireUploadTask;
    percentage: Observable<number>;
    uploading: Observable<boolean>;
    finished: Observable<boolean>;
    pauser: Observable<boolean>;
    error: Observable<boolean>;
    canceled: Observable<boolean>;
    bytesuploaded: Observable<number>;
    state: Observable<string>;
}