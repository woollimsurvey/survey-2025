"use client";

import Form from "next/form";
import { useRouter } from "next/navigation";

import { Divider } from "@/components/divider";
import { Text, Strong } from "@/components/text";
import { Label } from "@/components/fieldset";
import { Radio, RadioField, RadioGroup } from "@/components/radio";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Home() {
  const router = useRouter();

  const { agree, setAgree } = useForm();

  const handlePersonal = (e) => {
    setAgree(e);
  };

  const handleNext = () => {
    if (agree !== "yes") {
      alert(
        "본 설문은 개인정보 수집 및 이용에 대한 동의가 있어야만 참여가 가능합니다\n현재 ‘미동의’를 선택하셨기 때문에 설문이 진행되지 않습니다.\n다시 참여를 원하시면 첫 페이지로 돌아가 동의 후 설문을 진행해 주시기 바랍니다."
      );

      return;
    }

    router.push("/basic");
  };

  return (
    <Form action={handleNext}>
      <header className="text-center">
        <Divider className="my-6" />
        <h1 className="text-4xl font-semibold text-zinc-950">
          2025년 산업기술수준조사
        </h1>
        <Divider className="my-6" />
      </header>
      <main>
        <article>
          <Text className="indent-1">안녕하십니까?</Text>
          <br />
          <Text className="indent-1">
            저희는 한국산업기술기획평가원(KEIT)과 함께 2025년 기술수준조사를
            실시 하고 있으며, 본 조사는 델파이 조사 중 1차 조사에 해당합니다.
          </Text>
          <br />
          <Text className="indent-1">
            바쁘신 와중에도 조사에 응해주심에 감사하다는 말씀드리며, 제시된
            문항에 성실하게 응답해주신 분들에 한하여 소정의 기프티콘을
            지급해드릴 예정이오니 적극적인 참여를 부탁드리겠습니다.
          </Text>
          <Text className="mt-1">
            ㅇ <Strong>(조사 방법)</Strong> 아래 사항들을 참고하시어 답변
            부탁드립니다.
          </Text>
          <Text className="indent-1">
            1) 위원님께서 평가하실 수 있는 중분류 기술을 선택
            <Strong>(복수 선택 가능)</Strong>
          </Text>
          <Text className="indent-1">
            2) 설문 참여에 앞서 이전 기술수준조사 결과 확인·검토
          </Text>
          <Text className="indent-1">
            3) 2)의 자료를 참고하여 설문지에 안내된 내용에 따라 성실히 응답
          </Text>
          <Text>
            ㅇ <Strong>(조사 일정)</Strong> 10월 20일(월) ~ 11월 03일(월)
          </Text>
        </article>
        <Divider className="mt-6" />
        <article className="py-6 bg-gray-100">
          <Text className="indent-1">
            동 조사의 응답 결과는 조사목적을 위해서만 활용될 예정이며,
            개인정보보호법 제15조(개인정보 수집․ 이용) 및 통계법 제33조(비밀의
            보호 등)에 의거하여 개인정보 수집·이용에 대해 아래와 같이
            안내드리오니 확인하여 주시기 바랍니다.
          </Text>
          <Text className="indent-1">
            ㅇ 개인정보의 수집 이용 목적 : 2025년 산업기술수준조사
          </Text>
          <Text className="indent-1">
            ㅇ 수집하려는 개인정보의 필수 항목 : 성명, 소속기관명, 직위, 연구
            경력, 휴대전화번호, 이메일
          </Text>
          <Text className="indent-1">
            ㅇ 개인정보의 보유 및 이용 기간 : 2025년 산업기술수준조사 완료시까지
          </Text>
          <Text className="indent-1">
            ※ 개인정보보호법에 의거하여 개인정보 수집 및 이용에 따른 동의를
            거부할 수 있으나, 동의를 거부할 경우 조사 참여가 제한됨을
            안내드립니다.
          </Text>
          <div className="flex justify-evenly mt-3 mr-3 ml-3 border p-1">
            <Text>개인정보의 수집 및 이용에 동의하십니까?</Text>
            <RadioGroup
              aria-label="agree"
              className="flex items-center gap-8"
              value={agree}
              onChange={handlePersonal}
            >
              <RadioField className="m-0">
                <Radio value="yes" />
                <Label>동의함</Label>
              </RadioField>
              <RadioField>
                <Radio value="no" />
                <Label>동의하지 않음</Label>
              </RadioField>
            </RadioGroup>
          </div>
        </article>
        <Divider className="mb-6" />
        <Text className="my-2 text-center">2025. 10. 20.</Text>
        <Text>
          ㅇ <Strong>주관기관</Strong> : 한국산업기술기획평가원
        </Text>
        <Text>
          ㅇ <Strong>조사수행</Strong> : ㈜전략울림
        </Text>
        <Text>
          ㅇ <Strong>조사문의</Strong>
        </Text>
        <Text className="indent-3">
          - ㈜전략울림 이성민 팀장(smlee@woollimi.com)
        </Text>
        <Text className="indent-3">
          - ㈜전략울림 김진현 선임(kjhjs2080@woollimi.com)
        </Text>
      </main>
      <footer className="my-6 text-center">
        <Button type="submit">설문조사 시작</Button>
      </footer>
    </Form>
  );
}
