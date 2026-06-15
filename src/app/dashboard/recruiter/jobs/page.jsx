import React from "react";
import { Chip, Table, Button, Tooltip } from "@heroui/react";
import { Video, Pencil, TrashBin } from "@gravity-ui/icons";
import { getCompanyJobs } from "@/lib/api/job";
import { getLogedInRecruiterCompany } from "@/lib/api/companies";
import Link from "next/link";

const RecruiterJobs = async () => {
  const company = await getLogedInRecruiterCompany();
  const jobs = (await getCompanyJobs(company._id)) || [];

  // Helper to determine status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "success";
      case "inactive":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      {/* Table Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Manage All Jobs
          </h2>
          <p className="text-sm text-zinc-400">
            View, update, or remove job listings for your company.
          </p>
        </div>
        <Link href="/dashboard/recruiter/jobs/new">
          <Button className="bg-white hover:bg-zinc-200 text-black font-semibold text-sm rounded-xl px-5 h-10 transition active:scale-[0.98]">
            + Post New Job
          </Button>
        </Link>
      </div>

      {/* Styled Wrapper Container replacing the faulty classNames prop */}
      <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 shadow-none backdrop-blur-md">
        <Table aria-label="Company jobs management table">
          <Table.ResizableContainer>
            <Table.Content className="min-w-[800px]">
              <Table.Header>
                {/* Custom header styles enforced via simple Tailwind strings */}
                <Table.Column
                  isRowHeader
                  defaultWidth="2fr"
                  id="jobTitle"
                  minWidth={180}
                  className="bg-zinc-800/50 text-zinc-400 font-semibold text-xs border-b border-zinc-800/80 py-3"
                >
                  Job Title
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1.2fr"
                  id="typeLocation"
                  minWidth={140}
                  className="bg-zinc-800/50 text-zinc-400 font-semibold text-xs border-b border-zinc-800/80 py-3"
                >
                  Type & Location
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1.2fr"
                  id="salary"
                  minWidth={150}
                  className="bg-zinc-800/50 text-zinc-400 font-semibold text-xs border-b border-zinc-800/80 py-3"
                >
                  Salary Range
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1fr"
                  id="deadline"
                  minWidth={120}
                  className="bg-zinc-800/50 text-zinc-400 font-semibold text-xs border-b border-zinc-800/80 py-3"
                >
                  Deadline
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1fr"
                  id="status"
                  minWidth={100}
                  className="bg-zinc-800/50 text-zinc-400 font-semibold text-xs border-b border-zinc-800/80 py-3"
                >
                  Status
                  <Table.ColumnResizer />
                </Table.Column>

                <Table.Column
                  defaultWidth="1fr"
                  id="actions"
                  minWidth={120}
                  className="bg-zinc-800/50 text-zinc-400 font-semibold text-xs border-b border-zinc-800/80 py-3"
                >
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body
                emptyContent={
                  <span className="text-zinc-500">
                    No jobs found for this company.
                  </span>
                }
              >
                {jobs.map((job) => {
                  const jobId = job._id?.$oid || job._id;

                  return (
                    <Table.Row
                      key={jobId}
                      className="hover:bg-zinc-800/20 transition-colors"
                    >
                      {/* Job Title */}
                      <Table.Cell className="py-4 border-b border-zinc-800/40">
                        <span className="font-semibold text-white text-base tracking-wide">
                          {job.jobTitle}
                        </span>
                      </Table.Cell>

                      {/* Type & Location */}
                      <Table.Cell className="py-4 border-b border-zinc-800/40">
                        <div className="flex flex-col text-xs gap-0.5">
                          <span className="capitalize text-blue-400 font-semibold">
                            {job.jobType}
                          </span>
                          <span className="text-zinc-400">
                            {job.isRemote ? "Remote" : job.location}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Salary Range */}
                      <Table.Cell className="py-4 border-b border-zinc-800/40">
                        <span className="text-sm font-medium text-zinc-300">
                          {parseInt(job.minSalary || 0).toLocaleString()} -{" "}
                          {parseInt(job.maxSalary || 0).toLocaleString()}{" "}
                          {job.currency}
                        </span>
                      </Table.Cell>

                      {/* Deadline */}
                      <Table.Cell className="py-4 border-b border-zinc-800/40">
                        <span className="text-sm text-zinc-300">
                          {job.deadline}
                        </span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell className="py-4 border-b border-zinc-800/40">
                        <Chip
                          color={getStatusColor(job.status)}
                          size="sm"
                          variant="flat"
                          className="capitalize font-medium px-2.5"
                        >
                          {job.status || "unknown"}
                        </Chip>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="py-4 border-b border-zinc-800/40">
                        <div className="flex items-center gap-1">
                          <Tooltip content="Video Details" closeDelay={0}>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              aria-label="Video Details"
                            >
                              <Video className="w-4 h-4 text-zinc-300 hover:text-white transition-colors" />
                            </Button>
                          </Tooltip>

                          <Tooltip content="Edit Job" closeDelay={0}>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              aria-label="Edit Job"
                            >
                              <Pencil className="w-4 h-4 text-zinc-300 hover:text-white transition-colors" />
                            </Button>
                          </Tooltip>

                          <Tooltip
                            content="Delete Job"
                            color="danger"
                            closeDelay={0}
                          >
                            <Button
                              isIconOnly
                              size="sm"
                              variant="light"
                              color="danger"
                              aria-label="Delete Job"
                            >
                              <TrashBin className="w-4 h-4 text-danger-400 hover:text-danger-300 transition-colors" />
                            </Button>
                          </Tooltip>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
};

export default RecruiterJobs;
