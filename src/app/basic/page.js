"use client";

import { useForm } from "@/contexts/FormContext";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { Label } from "@/components/fieldset";
import { Radio, RadioField, RadioGroup } from "@/components/radio";
import { Button } from "@/components/button";

export default function Basic() {
  const {
    name,
    setName,
    company,
    setCompany,
    position,
    setPosition,
    classification,
    setClassification,
    etc,
    setEtc,
    career,
    setCareer,
    tel,
    setTel,
    email,
    setEmail,
  } = useForm();

  const handleNext = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleNext}>
      <header className="my-3 p-3 bg-gray-50 ">
        <Heading level={2}>
          <Badge className="align-middle">1</Badge> 응답자 기본 조사
        </Heading>
      </header>
      <main>
        <Heading level={3}>1Q. 개인정보에 대해 응답해주시기 바랍니다.</Heading>
        <Text className="indent-4">
          ※ 추후 상품권 지급 대상 선정·지급 시 해당 연락처/이메일이 활용됨에
          따라 정확히 입력을 부탁드립니다.
        </Text>
        <section className="grid grid-cols-[1fr_9fr] my-16 border">
          <div className="row-span-2 flex justify-center items-center border-r bg-blue-950">
            <strong className="text-lg text-white">응답자 정보</strong>
          </div>
          <div className="grid grid-cols-3 border-b">
            <div className="border-r border-b text-lg font-bold text-center leading-8">
              성명
            </div>
            <div className="border-r border-b text-lg font-bold text-center leading-8">
              소속기관명
            </div>
            <div className="border-r border-b text-lg font-bold text-center leading-8">
              직위
            </div>
            <div className="flex items-center border-r px-4 h-16">
              <Input
                aria-label="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border-r px-4 h-16">
              <Input
                aria-label="company"
                name="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border-r px-4 h-16">
              <Input
                aria-label="position"
                name="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="border-r border-b text-lg font-bold text-center leading-8">
              소속 구분
            </div>
            <div className="border-r border-b text-lg font-bold text-center leading-8">
              연구 경력
            </div>
            <div className="border-r border-b text-lg font-bold text-center leading-8">
              연락처(핸드폰 번호)
            </div>
            <div className="border-r border-b text-lg font-bold text-center leading-8">
              이메일
            </div>
            <div className="border-r p-4">
              <RadioGroup
                name="classification"
                aria-label="classification"
                value={classification}
                onChange={(e) => setClassification(e)}
              >
                <RadioField>
                  <Radio value="ind" />
                  <Label>산(기업)</Label>
                </RadioField>
                <RadioField>
                  <Radio value="aca" />
                  <Label>학(대학)</Label>
                </RadioField>
                <RadioField>
                  <Radio value="lab" />
                  <Label>연(연구소)</Label>
                </RadioField>
                <RadioField>
                  <Radio value="etc" />
                  <Label>
                    기타
                    <Input
                      name="etc"
                      aria-label="etc"
                      value={etc}
                      onChange={(e) => setEtc(e.target.value)}
                      disabled={classification !== "etc"}
                    />
                  </Label>
                </RadioField>
              </RadioGroup>
            </div>
            <div className="border-r p-4">
              <RadioGroup
                name="career"
                aria-label="career"
                value={career}
                onChange={(e) => setCareer(e)}
              >
                <RadioField>
                  <Radio value="0" />
                  <Label>5년 미만</Label>
                </RadioField>
                <RadioField>
                  <Radio value="5" />
                  <Label>5~10년 미만</Label>
                </RadioField>
                <RadioField>
                  <Radio value="10" />
                  <Label>10~15년 미만</Label>
                </RadioField>
                <RadioField>
                  <Radio value="15" />
                  <Label>15~20년 미만</Label>
                </RadioField>
                <RadioField>
                  <Radio value="20" />
                  <Label>20년 이상</Label>
                </RadioField>
              </RadioGroup>
            </div>
            <div className="flex items-center border-r px-4">
              <Input
                type="tel"
                aria-label="tel"
                name="tel"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center border-r px-4">
              <Input
                type="email"
                aria-label="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="text-right">
        <Button type="submit">다음</Button>
      </footer>
    </form>
  );
}
