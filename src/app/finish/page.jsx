import { Divider } from "@/components/divider";
import { Text } from "@/components/text";

export default function Finish() {
  return (
    <div>
      <main>
        <Divider className="my-6" />
        <Text className="indent-1">
          바쁘신 가운데 귀중한 시간을 할애하시어 긴 설문에 응해주셔서 대단히
          감사합니다. 기재하신 모든 정보는 통계법에 의한 통계적 목적 이외에는
          사용되지 않으며, 참여 해주신 모든 분께 해당 분야의 설문 결과를
          알려드릴 것을 약속드립니다.
        </Text>
        <br />
        <Text className="indent-1">
          또한, 설문에 성실히 응답해주신 분들에게 1Q에 입력하신
          연락처/메일주소를 통해 소정의 상품권을 지급해드리고자 합니다. 상품권
          지급 대상은 2차 설문 종료 후 2026년 1월에 한 번에 지급해드릴
          예정이오니 참고해주시기 바랍니다.
        </Text>
        <br />
        <Text className="indent-1">
          지급 대상자분들에게는 개별적으로 문자 또는 이메일이 발송될 예정이며,
          1Q에 정확한 정보를 기재하지 않으신 분은 답례 지급이 어려운 점 참고해주
          시기 바랍니다.
        </Text>
        <br />
        <Text className="my-2 text-center">2025년 10월</Text>
        <br />
        <h1 className="text-3xl font-semibold text-zinc-950 text-center">
          한국산업기술기획평가원
        </h1>
        <Divider className="my-6" />
      </main>
      <footer className="my-12 text-2xl font-medium text-center">
        - 설문조사에 응해주셔서 감사합니다. -
      </footer>
    </div>
  );
}
