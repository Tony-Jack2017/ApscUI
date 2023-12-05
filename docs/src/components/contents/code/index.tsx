import {useState} from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages  } from "prismjs";
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism.css'; //Example style, you can use another


const Code = () => {
    const [code, setCode] = useState(
        `function add(a, b) {
    return a + b;
}`
    );
    return (
        <div className="apsc-code-box">
            <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, languages.ts, 'ts')}
                padding={10}
                style={{
                    fontFamily: '"Poppins", monospace',
                    fontSize: 18,
                }}
            />
        </div>
    )
}

export default Code