import React from "react"
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github
} from "lucide-react"

interface ResumePreviewProps {
  resumeData: any
  zoomLevel: number
}

export function ResumePreview({ resumeData, zoomLevel }: ResumePreviewProps) {

  return (
    <div className="w-full h-[80vh] flex items-center justify-center p-6">
      <div className="rounded-lg p-6 mb-6 shadow-sm overflow-hidden">
        <div
          className="bg-white shadow-lg"
          style={{
            width: '595px',
            height: '700px',
            overflowX: zoomLevel <= 100 ? 'hidden' : 'auto',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top left',
              width: zoomLevel <= 100 ? '595px' : `${Math.min(10000 / zoomLevel, 100)}%`,
              height: 'max-content',
            }}
          >
            <div
              className="bg-white relative"
              style={{
                width: '595px',
                minHeight: '842px',
                fontFamily: 'Georgia, "Times New Roman", Times, serif',
                fontSize: '14px',
                lineHeight: '1.4',
                color: '#1a1a1a'
              }}
            >
              <div className="px-16 py-12">
                <div className="space-y-8">
                  <div className="text-center border-b border-gray-300 pb-6">
                    <h1
                      className="font-bold text-gray-900 mb-2"
                      style={{ fontSize: '28px', letterSpacing: '0.5px' }}
                    >
                      {resumeData?.personal?.fullName || "Your Name"}
                    </h1>
                    {resumeData?.personal?.professionalTitle && (
                      <p
                        className="text-gray-700 mb-4"
                        style={{ fontSize: '16px', fontStyle: 'italic' }}
                      >
                        {resumeData.personal.professionalTitle}
                      </p>
                    )}
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                      {resumeData?.personal?.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>{resumeData.personal.email}</span>
                        </div>
                      )}
                      {resumeData?.personal?.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{resumeData.personal.phone}</span>
                        </div>
                      )}
                      {(resumeData?.personal?.location || resumeData?.personal?.country) && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {resumeData.personal.location}
                            {resumeData.personal.location && resumeData.personal.country && ", "}
                            {resumeData.personal.country}
                          </span>
                        </div>
                      )}
                      {resumeData?.personal?.website && (
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          <span>{resumeData.personal.website}</span>
                        </div>
                      )}
                      {resumeData?.personal?.linkedin && (
                        <div className="flex items-center gap-1">
                          <Linkedin className="w-4 h-4" />
                          <span>{resumeData.personal.linkedin}</span>
                        </div>
                      )}
                      {resumeData?.personal?.github && (
                        <div className="flex items-center gap-1">
                          <Github className="w-4 h-4" />
                          <span>{resumeData.personal.github}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Professional Summary */}
                  {resumeData?.summary && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-3 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {resumeData.summary}
                      </p>
                    </div>
                  )}

                  {/* Work Experience */}
                  {resumeData?.experience?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Professional Experience
                      </h2>
                      <div className="space-y-6">
                        {resumeData.experience.map((exp: any) => (
                          <div key={exp.id} className="border-l-2 border-gray-200 pl-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-gray-900 text-base">
                                  {exp.position || "Position"}
                                </h3>
                                <p className="text-gray-700 font-medium">
                                  {exp.company || "Company"}
                                  {exp.employmentType && ` • ${exp.employmentType}`}
                                  {exp.locationType && ` • ${exp.locationType}`}
                                </p>
                              </div>
                              <div className="text-sm text-gray-600 text-right font-medium">
                                {exp.startDate} - {exp.endDate || "Present"}
                              </div>
                            </div>
                            {exp.technologiesUsed && (
                              <p className="text-sm text-gray-600 mb-2 font-medium">
                                <span className="font-bold">Technologies:</span> {exp.technologiesUsed}
                              </p>
                            )}
                            {exp.description && (
                              <p className="text-gray-700 mb-3 text-justify leading-relaxed">
                                {exp.description}
                              </p>
                            )}
                            {exp.responsibilities?.length > 0 && (
                              <ul className="list-disc list-outside ml-5 text-gray-700 space-y-1 mb-2">
                                {exp.responsibilities
                                  .filter((res: string) => res?.trim() !== "")
                                  .map((res: string, idx: number) => (
                                    <li key={idx}>{res}</li>
                                  ))}
                              </ul>
                            )}
                            {exp.achievements?.length > 0 && (
                              <ul className="list-disc list-outside ml-5 text-gray-700 space-y-1">
                                {exp.achievements
                                  .filter((ach: string) => ach?.trim() !== "")
                                  .map((ach: string, idx: number) => (
                                    <li key={idx} className="font-medium">{ach}</li>
                                  ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {resumeData?.education?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Education
                      </h2>
                      <div className="space-y-4">
                        {resumeData.education.map((edu: any) => (
                          <div key={edu.id}>
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="font-bold text-gray-900">
                                  {edu.degree || "Degree"} {edu.field && `in ${edu.field}`}
                                  {edu.minor && ` (Minor: ${edu.minor})`}
                                </h3>
                                <p className="text-gray-700 font-medium">{edu.school || "School"}</p>
                                {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                                {edu.honorsAwards && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-bold">Honors/Awards:</span> {edu.honorsAwards}
                                  </p>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 text-right font-medium">
                                {edu.startDate} - {edu.endDate}
                              </div>
                            </div>
                            {edu.relevantCoursework?.length > 0 && (
                              <div className="text-sm text-gray-600 mt-2">
                                <span className="font-bold">Relevant Coursework:</span>
                                <ul className="list-disc list-outside ml-5 mt-1">
                                  {edu.relevantCoursework
                                    .filter((course: string) => course?.trim() !== "")
                                    .map((course: string, idx: number) => (
                                      <li key={idx}>{course}</li>
                                    ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {resumeData?.projects?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Projects
                      </h2>
                      <div className="space-y-5">
                        {resumeData.projects.map((project: any) => (
                          <div key={project.id}>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-gray-900">
                                  {project.name || "Project Name"}
                                  {project.type && ` (${project.type})`}
                                </h3>
                                {project.role && <p className="text-gray-700 font-medium text-sm">{project.role}</p>}
                                {project.teamSize && (
                                  <p className="text-sm text-gray-600">Team Size: {project.teamSize}</p>
                                )}
                                {project.technologies && (
                                  <p className="text-sm text-gray-600">
                                    <span className="font-bold">Technologies:</span> {project.technologies}
                                  </p>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 text-right font-medium">
                                {project.startDate} - {project.endDate || "Present"}
                              </div>
                            </div>
                            {project.description && (
                              <p className="text-gray-700 leading-relaxed text-justify mb-2">
                                {project.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm">
                              {project.link && (
                                <span className="text-gray-600">
                                  <span className="font-bold">Link:</span> {project.link}
                                </span>
                              )}
                              {project.demoLink && (
                                <span className="text-gray-600">
                                  <span className="font-bold">Demo:</span> {project.demoLink}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {resumeData?.skills?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Technical Skills
                      </h2>
                      <div className="grid grid-cols-1 gap-2">
                        {resumeData.skills.map((skill: any) => (
                          <div key={skill.id} className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">
                              {skill.name || "Skill"}
                              {skill.category && ` (${skill.category})`}
                            </span>
                            {skill.level && (
                              <span className="text-sm text-gray-600 font-medium">{skill.level}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {resumeData?.certifications?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Certifications
                      </h2>
                      <div className="space-y-3">
                        {resumeData.certifications.map((cert: any) => (
                          <div key={cert.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-gray-900">{cert.name || "Certification Name"}</h3>
                                <p className="text-gray-700 font-medium">{cert.issuer || "Issuing Organization"}</p>
                                {(cert.credentialId || cert.expirationDate) && (
                                  <p className="text-sm text-gray-600">
                                    {cert.credentialId && `ID: ${cert.credentialId}`}
                                    {cert.credentialId && cert.expirationDate && " | "}
                                    {cert.expirationDate && `Expires: ${cert.expirationDate}`}
                                  </p>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 text-right font-medium">{cert.date}</div>
                            </div>
                            {cert.link && (
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-bold">Credential:</span> {cert.link}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Awards & Honors */}
                  {resumeData?.awards?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Awards & Honors
                      </h2>
                      <div className="space-y-3">
                        {resumeData.awards.map((award: any) => (
                          <div key={award.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-gray-900">{award.name || "Award Name"}</h3>
                                <p className="text-gray-700 font-medium">{award.issuer || "Issuer"}</p>
                              </div>
                              <div className="text-sm text-gray-600 text-right font-medium">{award.date}</div>
                            </div>
                            {award.description && (
                              <p className="text-gray-700 leading-relaxed mt-2 text-justify">
                                {award.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Publications */}
                  {resumeData?.publications?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Publications
                      </h2>
                      <div className="space-y-3">
                        {resumeData.publications.map((pub: any) => (
                          <div key={pub.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-gray-900">{pub.title || "Publication Title"}</h3>
                                <p className="text-gray-700 font-medium">{pub.publisher || "Publisher"}</p>
                              </div>
                              <div className="text-sm text-gray-600 text-right font-medium">{pub.date}</div>
                            </div>
                            {pub.link && (
                              <p className="text-sm text-gray-600 mt-1">
                                <span className="font-bold">Link:</span> {pub.link}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Volunteer Experience */}
                  {resumeData?.volunteer?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Volunteer Experience
                      </h2>
                      <div className="space-y-4">
                        {resumeData.volunteer.map((vol: any) => (
                          <div key={vol.id}>
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-gray-900">{vol.organization || "Organization"}</h3>
                                <p className="text-gray-700 font-medium">{vol.role || "Role"}</p>
                              </div>
                              <div className="text-sm text-gray-600 text-right font-medium">
                                {vol.startDate} - {vol.endDate || "Present"}
                              </div>
                            </div>
                            {vol.description && (
                              <p className="text-gray-700 leading-relaxed text-justify">
                                {vol.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {resumeData?.languages?.length > 0 && (
                    <div>
                      <h2 className="text-lg font-bold text-gray-900 mb-4 pb-1 border-b border-gray-200 uppercase tracking-wide">
                        Languages
                      </h2>
                      <div className="grid grid-cols-2 gap-2">
                        {resumeData.languages.map((lang: any) => (
                          <div key={lang.id} className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">{lang.name || "Language"}</span>
                            {lang.proficiency && (
                              <span className="text-sm text-gray-600 font-medium">{lang.proficiency}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}