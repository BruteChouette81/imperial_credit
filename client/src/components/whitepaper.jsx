import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
import filePDF from './css/CPL White Paper.pdf'
//import filePDF as the white paper

function Whitepaper() {
    return (
        <div class="Whitepaper">
             <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js" />
            <div id="pdfviewer">
                <Viewer fileUrl="https://arxiv.org/ftp/arxiv/papers/1710/1710.08836.pdf" /> 
            </div>
        </div>
    )
}


export default Whitepaper;