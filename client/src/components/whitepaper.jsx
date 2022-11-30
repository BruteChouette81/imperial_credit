import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
//import filePDF as the white paper

function Whitepaper() {
    return (
        <div class="Whitepaper">
             <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js" />
            <div id="pdfviewer">
                <Viewer fileUrl={filePDF} /> 
            </div>
        </div>
    )
}


export default Whitepaper;