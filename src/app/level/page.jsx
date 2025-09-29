"use client";

import { useEffect } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

export default function Level() {
  const router = useRouter();

  const { checkedInter, setCheckedInter, settingPer, setSettingPer } =
    useForm();

  const handlePrev = () => {
    setSettingPer(true);

    router.push("/country");
  };

  const handleNext = () => {
    setSettingPer(true);

    router.push("/gap");
  };

  useEffect(() => {
    if (!settingPer) {
      setCheckedInter((prevInter) =>
        prevInter.map((inter) => {
          if (inter.country === "kr")
            return {
              ...inter,
              krPer: 100,
              usPer: 0,
              cnPer: 0,
              jpPer: 0,
              euPer: 0,
              etcPer: 0,
            };
          if (inter.country === "us")
            return {
              ...inter,
              krPer: 0,
              usPer: 100,
              cnPer: 0,
              jpPer: 0,
              euPer: 0,
              etcPer: 0,
            };
          if (inter.country === "cn")
            return {
              ...inter,
              krPer: 0,
              usPer: 0,
              cnPer: 100,
              jpPer: 0,
              euPer: 0,
              etcPer: 0,
            };
          if (inter.country === "jp")
            return {
              ...inter,
              krPer: 0,
              usPer: 0,
              cnPer: 0,
              jpPer: 100,
              euPer: 0,
              etcPer: 0,
            };
          if (inter.country === "eu")
            return {
              ...inter,
              krPer: 0,
              usPer: 0,
              cnPer: 0,
              jpPer: 0,
              euPer: 100,
              etcPer: 0,
            };
          if (inter.country === "etc")
            return {
              ...inter,
              krPer: 0,
              usPer: 0,
              cnPer: 0,
              jpPer: 0,
              euPer: 0,
              etcPer: 100,
            };
        })
      );
    }
  }, []);

  return (
    <Form action={handleNext}>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <h3 className="my-4 text-3xl font-semibold text-zinc-950">
          □ (기술성) 위원님께서 선택하신 중분류 기술의 기술성(기술수준, 기술격차
          등)을 객관적으로 평가해주시기 바랍니다.
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
                <div className="flex justify-center items-center border-r border-b text-lg font-bold">
                  {inter.country === "kr" && "한국"}
                  {inter.country === "us" && "미국"}
                  {inter.country === "cn" && "중국"}
                  {inter.country === "jp" && "일본"}
                  {inter.country === "eu" && `유럽(${inter.euName})`}
                  {inter.country === "etc" && `기타(${inter.etcName})`}
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max={inter.country === "kr" ? 100 : 99}
                    aria-label="krPer"
                    name="krPer"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.krPer || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, krPer: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "kr"}
                    required
                  />
                  %
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max={inter.country === "us" ? 100 : 99}
                    aria-label="usPer"
                    name="usPer"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.usPer || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, usPer: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "us"}
                    required
                  />
                  %
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max={inter.country === "cn" ? 100 : 99}
                    aria-label="cnPer"
                    name="cnPer"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.cnPer || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, cnPer: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "cn"}
                    required
                  />
                  %
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max={inter.country === "jp" ? 100 : 99}
                    aria-label="jpPer"
                    name="jpPer"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.jpPer || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, jpPer: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "jp"}
                    required
                  />
                  %
                </div>
                <div className="flex items-center border-r border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max={inter.country === "eu" ? 100 : 99}
                    aria-label="euPer"
                    name="euPer"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.euPer || ""
                    }
                    onChange={({ target }) =>
                      setCheckedInter((prevList) =>
                        prevList.map((prev) => {
                          if (prev.code === inter.code) {
                            return { ...prev, euPer: target.value };
                          }

                          return prev;
                        })
                      )
                    }
                    disabled={inter.country === "eu"}
                    required
                  />
                  %
                </div>
                <div className="flex items-center border-b px-2">
                  <Input
                    type="number"
                    step="1"
                    min="0"
                    max={inter.country === "etc" ? 100 : 99}
                    aria-label="etcPer"
                    name="etcPer"
                    value={
                      checkedInter.find((ele) => ele.code === inter.code)
                        ?.etcPer || ""
                    }
                    disabled
                  />
                  %
                </div>
              </article>
            ))}
        </section>
        <Text>
          * 기타는 3Q-1.에서 기타 국가를 최고기술 보유국으로 선택한 경우만
          100%로 입력, 나머지 경우에는 작성 불필요
        </Text>
        <Text>
          ※ 최고기술 보유국에 제시된 국가는 무조건 100%로 기재해야 하며, 나머지
          국가는 해당 국가와 비교하여 상대적 기술수준을 %로 제시
        </Text>
      </main>
      <footer className="flex justify-end gap-4 my-4">
        <Button onClick={handlePrev}>이전</Button>
        <Button type="submit">다음</Button>
      </footer>
    </Form>
  );
}
