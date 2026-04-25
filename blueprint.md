# 훈민아이테크 기술 포털 - Blueprint

## Overview
훈민아이테크(Hun-Min I Tech) 기술 포털은 고해상도 프로젝터, LED 디스플레이, 3D 맵핑 등 전문 영상 솔루션에 대한 기술 정보를 제공하는 웹 사이트입니다. 깔끔하고 전문적인 문서를 제공하는 레이아웃을 갖추고 있습니다.

## Features & Design
- **Document-style Layout**: 좌측 사이드바 내비게이션과 우측 콘텐츠 영역으로 구성된 고전적이고 신뢰감 있는 레이아웃.
- **Web Components & Modern CSS**: 프레임워크 없이 순수 HTML/CSS/JS를 사용하며, 현대적인 CSS 기능을 활용하여 세련된 디자인 제공.
- **Interactive Tools**: LED 전광판 사양 계산기 등 실무에 유용한 도구 포함.
- **AI Assistant**: 기술 상담을 돕는 AI 챗봇 위젯 통합.
- **Responsive Navigation**: 모바일 기기 대응을 위한 햄버거 메뉴 및 슬라이딩 사이드바 구현.

## Responsive Design Strategy
- **Hamburger Menu**: 모바일 화면(992px 이하)에서 메뉴를 열고 닫을 수 있는 3줄 형태의 햄버거 버튼 도입.
- **Off-canvas Sidebar**: 모바일에서는 사이드바가 화면 좌측(-280px)에 숨겨져 있다가, 메뉴 버튼 클릭 시 부드럽게 슬라이드인(0) 방식으로 표시됨.
- **Sidebar Overlay**: 메뉴 활성화 시 본문 영역을 어둡게 처리하여 메뉴에 집중할 수 있도록 하고, 본문 클릭 시 메뉴가 닫히는 기능 제공.
- **Viewport Optimization**: `meta viewport` 설정을 통해 다양한 모바일 기기에서 올바른 비율로 표시되도록 최적화.

## Progress Tracking
- [x] Initial website setup (HTML/CSS/JS)
- [x] LED Calculator implementation
- [x] AI Chatbot UI integration
- [x] Responsive Sidebar Implementation
