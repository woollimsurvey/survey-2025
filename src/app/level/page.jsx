"use client";

import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

import { supabase } from "@/libs/supabaseClient";

export default function Level() {
  const router = useRouter();

  const {
    name,
    company,
    position,
    classification,
    etc,
    career,
    tel1,
    tel2,
    tel3,
    email,
    checkedInter,
    setCheckedInter,
  } = useForm();

  const handlePrev = () => {
    router.push("/country");
  };

  const handleNext = () => {};

  return (
    <form onSubmit={handleNext}>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <h3 className="my-4 text-3xl font-semibold text-zinc-950">
          □ (기술성) 위원님께서 선택하신 중분류 기술들의 기술성을 평가할 수 있는
          하위 문항에 응답해주시기 바랍니다.
        </h3>
        <Heading level={4}>
          3Q-2. (최고기술국 대비 기술수준)&nbsp;
          <span className="font-normal">
            선택하신 중분류 기술별 최고기술국(100%) 대비 상대적 기술수준을 아래
            설명을 참고하시어 국가별로 입력해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ 기술수준 : 최고기술국을 100%로, 나머지 국가는 최고기술국 대비 몇
          %인지 입력
        </Text>
        <Text className="indent-4">
          ※ 기술수준 입력 시 아래의 범위를 고려하여 응답해주십시오.
        </Text>
        <section className="my-4">
          <Heading level={5} className="my-2 text-center">
            &lt; 기술수준 설명 &gt;
          </Heading>
          <div className="grid grid-cols-[2fr_3fr] border text-center">
            <div className="border-r border-b bg-gray-100 text-lg font-bold leading-8">
              기술수준
            </div>
            <div className="border-b bg-gray-100 text-lg font-bold leading-8">
              설명
            </div>
            <div className="border-r border-b">세계최고(100%)</div>
            <div className="border-b">세계 최고의 기술 보유 국가</div>
            <div className="border-r border-b">선도수준(90~99%)</div>
            <div className="border-b">기술분야를 선도하는 수준</div>
            <div className="border-r border-b">추격수준(80~89%)</div>
            <div className="border-b">선진기술의 모방/개량이 가능한 수준</div>
            <div className="border-r border-b">후발수준(70~79%)</div>
            <div className="border-b">선진기술의 도입/적용이 가능한 수준</div>
            <div className="border-r">낙후수준(70% 미만)</div>
            <div>연구개발 능력이 취약한 수준</div>
          </div>
        </section>
        <section className="border-t border-r border-l text-center">
          <article className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              중분류
            </div>
            <div className="flex justify-center items-center border-r border-b bg-gray-100 text-xl font-bold">
              최고기술
              <br />
              보유국
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              한국
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              미국
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              중국
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              일본
            </div>
            <div className="border-r border-b bg-gray-100 text-xl font-bold leading-20">
              유럽
            </div>
            <div className="border-b bg-gray-100 text-xl font-bold leading-20">
              기타*
            </div>
          </article>
          {checkedInter
            .sort((a, b) => a.id - b.id)
            .map((inter) => (
              <article
                key={inter.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr]"
              >
                <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                  {inter.intermediate}
                  <span className="text-red-400">(!)</span>
                </div>
                <div className="border-r border-b p-2 text-lg font-bold">
                  {inter.country === "kr" && "한국"}
                  {inter.country === "us" && "미국"}
                  {inter.country === "cn" && "중국"}
                  {inter.country === "jp" && "일본"}
                  {inter.country === "eu" && "유럽"}
                  {inter.country === "etc" && "기타*"}
                </div>
              </article>
            ))}
        </section>
      </main>
      <footer className="flex justify-end gap-4 my-4">
        <Button onClick={handlePrev}>이전</Button>
        <Button type="submit">다음</Button>
      </footer>
    </form>
  );
}
