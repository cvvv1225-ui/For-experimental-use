document.addEventListener('DOMContentLoaded', () => {
    
    // [1] myCompiler 기준 전체 프로그래밍 언어 코드
    const boilerplates = {
        'Bash': { filename: 'script.sh', code: '#!/bin/bash\necho "Hello, World!"' },
        'C': { filename: 'main.c', code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
        'C++': { filename: 'main.cpp', code: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}' },
        'C#': { filename: 'Program.cs', code: 'using System;\n\nclass Program {\n    static void Main(string[] args) {\n        Console.WriteLine("Hello, World!");\n    }\n}' },
        'Clojure': { filename: 'core.clj', code: '(println "Hello, World!")' },
        'COBOL': { filename: 'main.cob', code: 'IDENTIFICATION DIVISION.\nPROGRAM-ID. HELLO-WORLD.\nPROCEDURE DIVISION.\n    DISPLAY "Hello, World!".\n    STOP RUN.' },
        'D': { filename: 'main.d', code: 'import std.stdio;\n\nvoid main() {\n    writeln("Hello, World!");\n}' },
        'Elixir': { filename: 'main.exs', code: 'IO.puts "Hello, World!"' },
        'Erlang': { filename: 'main.erl', code: '-module(main).\n-export([start/0]).\n\nstart() ->\n    io:fwrite("Hello, World!\\n").' },
        'F#': { filename: 'Program.fs', code: 'printfn "Hello, World!"' },
        'Fortran': { filename: 'main.f90', code: 'program hello\n    print *, "Hello, World!"\nend program hello' },
        'Go': { filename: 'main.go', code: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}' },
        'Groovy': { filename: 'main.groovy', code: 'println "Hello, World!"' },
        'Haskell': { filename: 'main.hs', code: 'main = putStrLn "Hello, World!"' },
        'Java': { filename: 'Main.java', code: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
        'JavaScript': { filename: 'index.js', code: 'console.log("Hello, World!");' },
        'Kotlin': { filename: 'main.kt', code: 'fun main() {\n    println("Hello, World!")\n}' },
        'Lua': { filename: 'main.lua', code: 'print("Hello, World!")' },
        'OCaml': { filename: 'main.ml', code: 'print_endline "Hello, World!"' },
        'Octave': { filename: 'main.m', code: 'disp(\'Hello, World!\')' },
        'Pascal': { filename: 'hello.pas', code: 'program Hello;\nbegin\n  writeln(\'Hello, World!\');\nend.' },
        'Perl': { filename: 'script.pl', code: 'print "Hello, World!\\n";' },
        'PHP': { filename: 'index.php', code: '<?php\necho "Hello, World!";' },
        'Python': { filename: 'main.py', code: 'print("Hello, World!")' },
        'R': { filename: 'script.R', code: 'cat("Hello, World!\\n")' },
        'Ruby': { filename: 'main.rb', code: 'puts "Hello, World!"' },
        'Rust': { filename: 'main.rs', code: 'fn main() {\n    println!("Hello, World!");\n}' },
        'Scala': { filename: 'Main.scala', code: 'object Main {\n  def main(args: Array[String]): Unit = {\n    println("Hello, World!")\n  }\n}' },
        'SQL': { filename: 'query.sql', code: 'SELECT \'Hello, World!\' AS greeting;' },
        'Swift': { filename: 'main.swift', code: 'import Foundation\n\nprint("Hello, World!")' },
        'TypeScript': { filename: 'index.ts', code: 'const message: string = "Hello, World!";\nconsole.log(message);' },
        'VB.NET': { filename: 'Module1.vb', code: 'Module Module1\n    Sub Main()\n        Console.WriteLine("Hello, World!")\n    End Sub\nEnd Module' }
    };

    // [2] ⭐️ 실시간 화면 번역을 위한 10개국 전체 UI 사전 정의
    const uiTranslations = {
        '한국어': { 
            mainTitle: '🌍 글로벌 개발자 언어 매칭 시스템', mainDesc: '원하는 프로그래밍 언어와 인터페이스 언어를 선택한 후 아래의 확인 버튼을 눌러주세요.', 
            progTitle: '💻 프로그래밍 언어 (A-Z)', humanTitle: '🗣️ 인터페이스 언어 (가나다순)', 
            confirmBtn: '확인 및 코드 생성', backBtn: '이전 화면으로', resultTitle: '🚀 환경 설정 완료', resultSubtitle: '선택하신 구성에 맞는 기본 시작 구조입니다.' 
        },
        '영어': { 
            mainTitle: '🌍 Global Developer Language Matching System', mainDesc: 'Select your desired programming and interface languages, then click the confirm button below.', 
            progTitle: '💻 Programming Language (A-Z)', humanTitle: '🗣️ Interface Language', 
            confirmBtn: 'Confirm & Generate Code', backBtn: 'Go Back', resultTitle: '🚀 Configuration Complete', resultSubtitle: 'Starter boilerplate code for your selected environment.' 
        },
        '일본어': { 
            mainTitle: '🌍 グローバル開発者言語マッチングシステム', mainDesc: '希望するプログラミング言語とインターフェース言語を選択し、下の確認ボタンを押してください。', 
            progTitle: '💻 プログラミング言語 (A-Z)', humanTitle: '🗣️ インターフェース言語', 
            confirmBtn: '確認してコードを生成', backBtn: '前の画面へ', resultTitle: '🚀 環境設定の完了', resultSubtitle: '選択された環境の初期コード構造です。' 
        },
        '중국어': { 
            mainTitle: '🌍 全球开发者语言匹配系统', mainDesc: '请选择您想要的编程语言和界面语言，然后点击下方的确认按钮。', 
            progTitle: '💻 编程语言 (A-Z)', humanTitle: '🗣️ 界面语言', 
            confirmBtn: '确认并生成代码', backBtn: '返回上一步', resultTitle: '🚀 环境设置完成', resultSubtitle: '这是您选择的环境的基础模板代码。' 
        },
        '스페인어': { 
            mainTitle: '🌍 Sistema Global de Emparejamiento de Lenguajes', mainDesc: 'Seleccione los lenguajes de programación e interfaz deseados y haga clic en el botón de confirmación a continuación.', 
            progTitle: '💻 Lenguaje de Programación (A-Z)', humanTitle: '🗣️ Idioma de Interfaz', 
            confirmBtn: 'Confirmar y Generar Código', backBtn: 'Volver atrás', resultTitle: '🚀 Configuración Completada', resultSubtitle: 'Código base para el entorno seleccionado.' 
        },
        '프랑스어': { 
            mainTitle: '🌍 Système de Correspondance de Langues pour Développeurs', mainDesc: 'Sélectionnez les langages de programmation et d\'interface souhaités, puis cliquez sur le bouton de confirmation ci-dessous.', 
            progTitle: '💻 Langage de Programmation (A-Z)', humanTitle: '🗣️ Langue d\'Interface', 
            confirmBtn: 'Confirmer et Générer le Code', backBtn: 'Retour', resultTitle: '🚀 Configuration Terminée', resultSubtitle: 'Code d\'initialisation pour l\'environnement sélectionné.' 
        },
        '독일어': { 
            mainTitle: '🌍 Globales Entwickler-Sprach-Matching-System', mainDesc: 'Wählen Sie die gewünschten Programmier- und Schnittstellensprachen aus und klicken Sie unten auf die Bestätigungsschaltfläche.', 
            progTitle: '💻 Programmiersprache (A-Z)', humanTitle: '🗣️ Schnittstellensprache', 
            confirmBtn: 'Bestätigen & Code Generieren', backBtn: 'Zurück', resultTitle: '🚀 Konfiguration Abgeschlossen', resultSubtitle: 'Starter-Code für die ausgewählte Umgebung.' 
        },
        '러시아어': { 
            mainTitle: '🌍 Глобальная Система Подбора Языков Разработки', mainDesc: 'Выберите желаемые языки программирования и интерфейса, затем нажмите кнопку подтверждения ниже.', 
            progTitle: '💻 Язык Программирования (A-Z)', humanTitle: '🗣️ Язык Интерфейса', 
            confirmBtn: 'Подтвердить и Сгенерировать', backBtn: 'Назад', resultTitle: '🚀 Настройка Завершена', resultSubtitle: 'Базовый начальный код для выбранной среды.' 
        },
        '베트남어': { 
            mainTitle: '🌍 Hệ thống ghép nối ngôn ngữ cho nhà phát triển', mainDesc: 'Chọn ngôn ngữ lập trình và giao diện mong muốn của bạn, sau đó nhấp vào nút xác nhận bên dưới.', 
            progTitle: '💻 Ngôn ngữ lập trình (A-Z)', humanTitle: '🗣️ Ngôn ngữ giao diện', 
            confirmBtn: 'Xác nhận & Tạo mã', backBtn: 'Quay lại', resultTitle: '🚀 Cấu Hình Hoàn Tất', resultSubtitle: 'Mã khởi đầu cơ bản cho môi trường đã chọn.' 
        },
        '미얀마어': { 
            mainTitle: '🌍 ကမ္ဘာလုံးဆိုင်ရာ ဆော့ဖ်ဝဲရေးသားသူ ဘာသာစကား တွဲဖက်စနစ်', mainDesc: 'သင်အလိုရှိသော ပရိုဂရမ်းမင်းနှင့် အင်တာဖေ့စ် ဘာသာစကားများကို ရွေးချယ်ပြီး အောက်ပါ အတည်ပြုခလုတ်ကို နှိပ်ပါ။', 
            progTitle: '💻 ပရိုဂရမ်းမင်း ဘာသာစကား (A-Z)', humanTitle: '🗣️ အင်တာဖေ့စ် ဘာသာစကား', 
            confirmBtn: 'အတည်ပြုပြီး ကုဒ်ထုတ်ရန်', backBtn: 'နောက်သို့', resultTitle: '🚀 ပတ်ဝန်းကျင် တည်ဆောက်မှု ပြီးပါပြီ', resultSubtitle: 'သင်ရွေးချယ်ထားသော စနစ်အတွက် အခြေခံ ကုဒ်ဖြစ်ပါသည်။' 
        }
    };

    // DOM 캐싱 (텍스트를 바꿀 요소들)
    const uiMainTitle = document.getElementById('ui-main-title');
    const uiMainDesc = document.getElementById('ui-main-desc');
    const uiProgTitle = document.getElementById('ui-prog-title');
    const uiHumanTitle = document.getElementById('ui-human-title');
    const confirmBtn = document.getElementById('confirm-btn');
    const backBtn = document.getElementById('back-btn');

    const progItems = document.querySelectorAll('#prog-list li');
    const humanItems = document.querySelectorAll('#human-list li');
    
    const selectionScreen = document.getElementById('selection-screen');
    const resultScreen = document.getElementById('result-screen');
    const resultTitle = document.getElementById('result-title');
    const resultSubtitle = document.getElementById('result-subtitle');
    const codeFilename = document.getElementById('code-filename');
    const codeDisplay = document.getElementById('code-display');

    let selectedProg = null;
    let selectedHuman = null;

    // [3] 버튼 활성화 검사
    function validateSelection() {
        if (selectedProg && selectedHuman) {
            confirmBtn.removeAttribute('disabled');
        } else {
            confirmBtn.setAttribute('disabled', 'true');
        }
    }

    // [4] 실시간 텍스트 업데이트 함수
    function updateUIText(langKey) {
        const textData = uiTranslations[langKey];
        if(!textData) return; // 데이터가 없으면 무시

        // 선택 즉시 화면 텍스트 교체 (DOM 조작)
        uiMainTitle.textContent = textData.mainTitle;
        uiMainDesc.textContent = textData.mainDesc;
        uiProgTitle.textContent = textData.progTitle;
        uiHumanTitle.textContent = textData.humanTitle;
        confirmBtn.textContent = textData.confirmBtn;
        backBtn.textContent = textData.backBtn;
    }

    // 프로그래밍 언어 클릭
    progItems.forEach(item => {
        item.addEventListener('click', () => {
            progItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedProg = item.getAttribute('data-value');
            validateSelection();
        });
    });

    // ⭐️ 인터페이스 언어 클릭 (여기서 실시간 번역 호출)
    humanItems.forEach(item => {
        item.addEventListener('click', () => {
            humanItems.forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            selectedHuman = item.getAttribute('data-value');
            
            // 클릭한 언어에 맞춰 실시간으로 화면 전체 텍스트 변경
            updateUIText(selectedHuman);
            
            validateSelection();
        });
    });

    // 확인 버튼 (다음 화면으로 넘어가면서 결과 화면 텍스트 세팅)
    confirmBtn.addEventListener('click', () => {
        if (!selectedProg || !selectedHuman) return;

        const targetTemplate = boilerplates[selectedProg] || { filename: 'main.txt', code: 'Hello, World!' };
        const uiText = uiTranslations[selectedHuman] || uiTranslations['한국어'];

        resultTitle.textContent = `${uiText.resultTitle} (${selectedProg})`;
        resultSubtitle.textContent = uiText.resultSubtitle;
        codeFilename.textContent = targetTemplate.filename;
        codeDisplay.textContent = targetTemplate.code;

        selectionScreen.classList.remove('active');
        resultScreen.classList.add('active');
    });

    // 뒤로가기 버튼
    backBtn.addEventListener('click', () => {
        resultScreen.classList.remove('active');
        selectionScreen.classList.add('active');
    });
});