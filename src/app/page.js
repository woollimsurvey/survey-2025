import { Divider } from "@/components/divider";
import { Strong } from "@/components/text";
import { Button } from "@/components/button";

export default function Home() {
  return (
    <div>
      <header className="text-center">
        <Divider className="my-6" />
        <h1 className="text-2xl font-semibold text-zinc-950">
          2025년 산업기술수준조사
        </h1>
        <Divider className="my-6" />
      </header>
      <main>
        <article>
          <p className="indent-1 text-zinc-500">안녕하십니까?</p>
          <p className="indent-1 text-zinc-500">
            본 조사는 한국산업기술기획평가원(KEIT)에서 산업기술의 현 발전 수준을
            진단하고 낙후된 기술 분야를 파악하기 위해 2년마다 실시하는 기술수준
            조사 설문으로, 델파이 조사 중 1차 조사에 해당합니다.
          </p>
          <p className="indent-1 text-zinc-500">
            본 조사는 「산업기술혁신 촉진법 시행 규칙」 제10조(한국산업기술평가
            관리원의 사업), 「산업기술혁신사업 공통 운영요령」 제11조(전문기관)
            및 제17조(사업별 지원분야 발굴)에 근거하여 진행하고 있습니다.
          </p>
          <p className="indent-1 text-zinc-500">
            바쁘신 와중에도 기술수준 조사 전문가로 활동하여 주심에 감사드리며,
            기술수준 조사 결과에 전문가님의 고견이 반영될 수 있도록 적극 협조
            부탁드리겠습니다.
          </p>
        </article>
        <Divider className="mt-6" />
        <article className="py-6 bg-gray-100">
          <p className="my-1 text-zinc-500">
            ㅇ <Strong>(조사 목적)</Strong> 현 발전 수준 진단 및 낙후된 기술
            분야 파악을 통한 산업기술 R&D투자 우선순위 설정, 산업 R&D 투자방향의
            전략성 확보 및 R&D 재원의 효율적 배분, 중점투자, 개발이 시급한
            기술분야 발굴 등
          </p>
          <p className="my-1 text-zinc-500">
            ㅇ <Strong>(대상 기술)</Strong> R&D 전략 23대 분야(75개 대분류 기술
            포함) 중 000분야 기술
          </p>
          <p className="my-1 text-zinc-500">
            ㅇ <Strong>(조사 방법)</Strong> 아래 사항들을 참고하시어 답변
            부탁드립니다.
          </p>
          <p className="indent-1 text-zinc-500">
            1) 위원님께서 평가하실 수 있는 중분류 기술을 선택
            <Strong>(복수 선택 가능)</Strong>
          </p>
          <p className="indent-1 text-zinc-500">
            2) 설문 참여에 앞서 이전 기술수준조사 결과 확인·검토
          </p>
          <p className="indent-1 text-zinc-500">
            3) 2)의 자료를 참고하여 해당 기술분야에 대한 기술수준(상대수준(%),
            기술격차(년)) 등을 설문지에 안내된 내용에 따라 성실히 평가·답변
          </p>
          <p className="my-1 text-zinc-500">
            ㅇ <Strong>(조사 참여자)</Strong> 000분야 전문가
          </p>
          <p className="text-zinc-500">
            ㅇ <Strong>(조사 일정)</Strong> 10월 00일 ~ 10월 00일
          </p>
          <p className="indent-2 text-zinc-500">
            <Strong>
              ※ 2차 조사는 1차 조사 참여자 중 일부 대상자를 선정하여 11~12월
              중에 추진 예정
            </Strong>
          </p>
        </article>
        <Divider className="mb-6" />
        <p className="indent-1 text-zinc-500">
          바쁘신 가운데 귀중한 시간을 할애하시어 이번 조사에 참여해주시는 것에
          깊이 감사드리며, 제시된 문항에 아시는 바에 따라 솔직하게 응답하여 주실
          것을 부탁드 립니다. 특히, 다수의 중분류를 대상으로 전 문항에 성실히
          응해주신 분들께 소정의 상품권을 드릴 예정이오니 많은 참여
          부탁드리겠습니다.
        </p>
        <p className="my-2 text-center text-zinc-500">2025. 10. 00.</p>
        <p className="text-zinc-500">
          ㅇ <Strong>주관기관</Strong> : 한국산업기술기획평가원
        </p>
        <p className="text-zinc-500">
          ㅇ <Strong>조사수행</Strong> : ㈜전략울림
        </p>
        <p className="text-zinc-500">
          ㅇ <Strong>조사문의</Strong>
        </p>
        <p className="indent-3 text-zinc-500">
          - ㈜전략울림 000 팀장(000@woollimi.com, 00-0000-0000)
        </p>
        <p className="indent-3 text-zinc-500">
          - ㈜전략울림 000 선임(000@woollimi.com, 00-0000-0000)
        </p>
      </main>
      <footer className="text-center">
        <Button href="/basic">설문조사 시작</Button>
      </footer>
    </div>
  );
}
